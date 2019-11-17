<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="py-2">
        <div class="title text--primary">合同选择</div>

        <v-container fluid>
          <v-row dense>
            <v-col cols="6" md="4" sm="6">
              <v-menu v-model="stockOutTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="stockOutInfo.outTime" label="出库时间" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="stockOutInfo.outTime" :day-format="$util.pickerDayFormat" @input="stockOutTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="4" sm="6">
              <customer-select :customer-id.sync="stockOutInfo.customerId"></customer-select>
            </v-col>

            <v-col cols="6" md="4" sm="6">
              <v-select :items="contractListData" label="选择合同*" :rules="contractRules" :hint="`${selectedContract.number}`" item-text="name" item-value="id" v-model="selectedContract" persistent-hint return-object></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea label="备注" v-model="stockOutInfo.remark" rows="1" auto-grow></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-btn small class="primary" @click="searchStore">搜索库存</v-btn>
      </v-card-text>

      <v-card-text class="py-2">
        <div class="title text--primary">在库库存</div>

        <v-container fluid>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-data-table :headers="storeHeaders" :items="storeListData" :items-per-page="10" hide-default-footer disable-pagination>
                <template v-slot:item.inTime="{ item }">
                  {{ item.inTime | displayDate }}
                </template>
                <template v-slot:item.billingType="{ item }">
                  {{ item.billingType | billingType }}
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn small color="success" @click="addStockOut(item)">
                    出库
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text class="py-2">
        <div class="title text--primary">出库列表</div>

        <v-container fluid>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-data-table :headers="taskHeaders" :items="taskInfoList" hide-default-footer disable-pagination>
                <template v-slot:item.outCount="props">
                  <v-edit-dialog :return-value.sync="props.item.outCount" @save="taskSave" @cancel="taskCancel" @open="taskOpen" @close="taskClose"> {{ props.item.outCount }}
                    <template v-slot:input>
                      <v-text-field v-model="props.item.outCount" :rules="digitRules" label="出库数量" single-line></v-text-field>
                    </template>
                  </v-edit-dialog>
                </template>
                <template v-slot:item.remark="props">
                  <v-edit-dialog :return-value.sync="props.item.remark" @save="taskSave" @cancel="taskCancel" @open="taskOpen" @close="taskClose"> {{ props.item.remark }}
                    <template v-slot:input>
                      <v-text-field v-model="props.item.remark" label="备注" single-line></v-text-field>
                    </template>
                  </v-edit-dialog>
                </template>
                <template v-slot:item.status="{ item }">
                  {{ item.status | displayStatus }}
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>

        <v-btn small class="primary" :disabled="!valid" @click="submit">提交</v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import contract from '@/controllers/contract'
import store from '@/controllers/store'
import stockOut from '@/controllers/stockOut'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StockOutCreate',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: true,
    stockOutTimeMenu: false,
    stockOutInfo: {
      outTime: null,
      monthTime: '',
      flowNumber: '',
      type: 1,
      customerId: 0,
      contractId: 0,
      userId: 0,
      userName: '',
      remark: ''
    },
    selectedContract: { id: 0, number: '' },
    contractListData: [],
    contractRules: [v => !!v.id || '请选择合同'],
    storeHeaders: [
      { text: '分类编码', value: 'categoryNumber' },
      { text: '分类名称', value: 'categoryName' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '托盘码', value: 'trayCode' },
      { text: '货品总数量', value: 'totalCount' },
      { text: '在库数量', value: 'storeCount' },
      { text: '货品总重量(吨)', value: 'totalWeight' },
      { text: '在库重量(吨)', value: 'storeWeight' },
      { text: '入库时间', value: 'inTime' },
      { text: '操作', value: 'action', sortable: false }
    ],
    storeListData: [],
    digitRules: [v => (v != null && /^\d+/.test(v)) || '请输入数字'],
    taskHeaders: [
      { text: '托盘码', value: 'trayCode', align: 'left' },
      { text: '类别名称', value: 'categoryName' },
      { text: '在库数量', value: 'storeCount' },
      { text: '出库数量', value: 'outCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'storeWeight' },
      { text: '规格', value: 'specification' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
      { text: '备注', value: 'remark' }
    ],
    taskInfoList: []
  }),
  watch: {
    'stockOutInfo.customerId': function(val) {
      this.loadContract(val)
    }
  },
  methods: {
    init: function() {
      this.stockOutInfo = {
        outTime: new Date().toISOString().substr(0, 10),
        monthTime: '',
        flowNumber: '',
        type: 1,
        customerId: 0,
        contractId: 0,
        userId: 0,
        userName: '',
        remark: ''
      }
      this.$refs.form.resetValidation()
    },

    loadContract(customerId) {
      this.selectedContract = { number: '' }
      let vm = this
      contract.getList(customerId).then(res => {
        vm.contractListData = res
        if (res.length > 0) {
          vm.selectedContract = res[0]
        }
      })
    },

    searchStore() {
      if (this.selectedContract.id == 0) {
        return
      }

      let vm = this
      store.findByContract({ contractId: this.selectedContract.id, isStoreIn: true }).then(res => {
        vm.storeListData = res
      })
    },

    addStockOut(item) {
      let task = {
        storeId: item.id,
        trayCode: item.trayCode,
        categoryName: item.categoryName,
        storeCount: item.storeCount,
        outCout: 0,
        unitWeight: item.unitWeight,
        storeWeight: item.storeWeight,
        specification: item.specification,
        originPlace: item.originPlace,
        durability: item.durability,
        remark: ''
      }
      this.taskInfoList.push(task)
    },

    taskSave() {},
    taskCancel() {},
    taskOpen() {},
    taskClose() {
      console.log('Dialog closed')
    },

    submit() {
      if (this.$refs.form.validate()) {
        if (this.taskInfoList.length == 0) {
          this.$store.commit('alertError', '请选择出库货品')
          return
        }

        stockOut.create(this.stockOutInfo, this.taskInfoList).then(res => {
          
        })
      }
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>
