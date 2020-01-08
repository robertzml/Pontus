<template>
  <div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple>出库单信息</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-card flat class="mx-auto">
            <v-form>
              <v-row dense>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDate(info.outTime)" label="出库时间" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.monthTime" label="出库月份" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.flowNumber" label="流水单号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.stockOutType(info.type)" label="出库类型" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.customerNumber" label="客户编号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.customerName" label="客户名称" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.contractNumber" label="合同编号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.contractName" label="合同名称" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.contractType(info.contractType)" label="合同类型" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.billingType(info.billingType)" label="计费方式" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.unitPrice" label="冷藏费单价" :suffix="$util.billingTypeUnit(info.billingType)" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.userName" label="登记人" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDateTime(info.confirmTime)" label="确认时间" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <v-text-field label=" 备注" :value="info.remark" readonly> </v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <vue-barcode v-if="stockOutId" v-bind:value="info.flowNumber" :height="50" :font-size="10"></vue-barcode>
                </v-col>
              </v-row>
            </v-form>

            <v-card-actions>
              <v-btn color="primary darken-1" :disabled="info.status != 81" @click="showAddTask">添加货物</v-btn>
              <v-btn color="deep-orange darken-3" v-if="info.status == 81" @click.stop="showFinish">出库单确认</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple>出库货物</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="headers" :items="taskInfoList" hide-default-footer disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewTaskItem(item)">
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <stock-out-edit-task ref="editTaskMod" @update="updateTask"></stock-out-edit-task>

    <v-dialog v-model="finishDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">出库单确认</v-card-title>
        <v-card-text>是否确认该出库单已经出库完成？请确认所有出库货物已经下架，确认后无法再增加货物。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="finishDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text @click="finish">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import StockOutEditTask from './EditTask'
import VueBarcode from 'vue-barcode'

export default {
  name: 'StockOutDetails',
  components: {
    StockOutEditTask,
    VueBarcode
  },
  data: () => ({
    panel: [0, 1],
    finishDialog: false,
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '类别名称', value: 'categoryName' },
      { text: '在库数量', value: 'storeCount' },
      { text: '出库数量', value: 'outCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '出库重量(t)', value: 'outWeight' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: []
  }),
  computed: mapState({
    stockOutId: state => state.stockOut.stockOutId,
    info: state => state.stockOut.stockOutInfo,
    refreshEvent: state => state.stockOut.refreshEvent
  }),
  watch: {
    stockOutId: function() {
      this.loadInfo()
      this.loadTaskList()
    },
    refreshEvent: function() {
      this.loadInfo()
      this.loadTaskList()
    }
  },
  methods: {
    ...mapMutations({
      setStockOutInfo: 'stockOut/setStockOutInfo',
      setTaskInfo: 'stockOut/setTaskInfo'
    }),
    ...mapActions({
      showTaskDetails: 'stockOut/showTaskDetals'
    }),

    // 载入入库单信息
    loadInfo() {
      if (this.stockOutId) {
        let vm = this
        stockOut.get(this.stockOutId).then(res => {
          vm.setStockOutInfo(res)
        })
      } else {
        this.setStockOutInfo({})
      }
    },

    // 载入出库任务列表
    loadTaskList() {
      if (this.stockOutId) {
        let vm = this
        stockOut.getTaskList(this.stockOutId).then(res => {
          vm.taskInfoList = res
        })
      } else {
        this.taskInfoList = []
      }
    },

    // 显示添加入库任务
    showAddTask() {
      if (this.stockOutId) {
        this.$refs.editTaskMod.init()
      }
    },

    // 完成编辑出库任务
    updateTask() {
      this.loadTaskList()
    },

    // 查看入库任务
    viewTaskItem(val) {
      this.setTaskInfo(val)
      this.showTaskDetails()
    },

    showFinish() {
      this.finishDialog = true
    },

    // 确认出库单完成
    finish() {
      let vm = this

      stockOut.confirm({ id: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '出库单已确认')
          vm.loadInfo()
          vm.finishDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    }
  },
  mounted: function() {
    this.loadInfo()
    this.loadTaskList()
  }
}
</script>
