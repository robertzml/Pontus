<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>库存快照</v-toolbar-title>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="3">
                <customer-select :customer-id.sync="search.customerId" :required="true"></customer-select>
              </v-col>

              <v-col cols="3">
                <v-select
                  :items="contractListData"
                  label="选择合同*"
                  :rules="contractRules"
                  :hint="`${search.selectedContract.number}`"
                  item-text="name"
                  item-value="id"
                  v-model="search.selectedContract"
                  persistent-hint
                  return-object
                ></v-select>
              </v-col>

              <v-col cols="3">
                <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.date" label="库存日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.date" :day-format="$util.pickerDayFormat" @input="dateMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" @click="searchStore">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          仓位库存记录
          <v-spacer></v-spacer>
          <span class="subtitle-2 ml-4">库存总数量: {{ totalCount }}</span>
          <span class="subtitle-2 ml-4">库存总重量: {{ totalWeight }} 吨</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="storeListData" :items-per-page="10">
            <template v-slot:item.initialTime="{ item }">
              {{ item.initialTime | displayDate }}
            </template>
            <template v-slot:item.inTime="{ item }">
              {{ item.inTime | displayDate }}
            </template>
            <template v-slot:item.outTime="{ item }">
              {{ item.outTime | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple darken-3">
          普通库存记录
          <v-spacer></v-spacer>
          <span class="subtitle-2 ml-4">库存总数量: {{ totalNormalCount }}</span>
          <span class="subtitle-2 ml-4">库存总重量: {{ totalNormalWeight }} 吨</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="normalStoreHeaders" :items="normalStoreListData" :items-per-page="10">
            <template v-slot:item.initialTime="{ item }">
              {{ item.initialTime | displayDate }}
            </template>
            <template v-slot:item.inTime="{ item }">
              {{ item.inTime | displayDate }}
            </template>
            <template v-slot:item.outTime="{ item }">
              {{ item.outTime | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="green darken-3">
          入库记录
          <v-spacer></v-spacer>
          <span class="subtitle-2 ml-4">入库总数量: {{ totalMoveInCount }}</span>
          <span class="subtitle-2 ml-4">入库总重量: {{ totalMoveInWeight }} 吨</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="stockInHeaders" :items="stockInTaskData" :items-per-page="10"> </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="light-green darken-3">
          出库记录
          <v-spacer></v-spacer>
          <span class="subtitle-2 ml-4">出库总数量: {{ totalMoveOutCount }}</span>
          <span class="subtitle-2 ml-4">出库总重量: {{ totalMoveOutWeight }} 吨</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="stockOutHeaders" :items="stockOutTaskData" :items-per-page="10"> </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-tabs grow background-color="brown darken-3" v-model="tab">
        <v-tab>搬入任务</v-tab>
        <v-tab>搬出任务</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-data-table :headers="carryInHeaders" :items="carryInListData" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | carryInTaskType }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.moveTime="{ item }">
              {{ item.moveTime | displayDateTime }}
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table :headers="carryOutHeaders" :items="carryOutListData" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | carryOutTaskType }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.moveTime="{ item }">
              {{ item.moveTime | displayDateTime }}
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import contract from '@/controllers/contract'
import store from '@/controllers/store'
import normalStore from '@/controllers/normalStore'
import stockIn from '@/controllers/stockIn'
import stockOut from '@/controllers/stockOut'
import carryIn from '@/controllers/carryIn'
import carryOut from '@/controllers/carryOut'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StoreSnapshot',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: false,
    dateMenu: false,
    search: {
      customerId: 0,
      selectedContract: { number: '' },
      date: moment().format('YYYY-MM-DD')
    },
    contractListData: [],
    contractRules: [v => !!v.id || '请选择合同'],
    headers: [
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' },
      { text: '托盘码', value: 'trayCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '批次', value: 'batch' },
      { text: '货品总数量', value: 'storeCount' },
      { text: '货品总重量(t)', value: 'storeWeight' },
      { text: '初始入库时间', value: 'initialTime' },
      { text: '入库时间', value: 'inTime' },
      { text: '出库时间', value: 'outTime' }
    ],
    storeListData: [],
    normalStoreHeaders: [
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' },
      { text: '所属仓库', value: 'warehouseName' },
      { text: '存放位置', value: 'place' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '批次', value: 'batch' },
      { text: '货品总数量', value: 'storeCount' },
      { text: '货品总重量(t)', value: 'storeWeight' },
      { text: '初始入库时间', value: 'initialTime' },
      { text: '入库时间', value: 'inTime' },
      { text: '出库时间', value: 'outTime' }
    ],
    normalStoreListData: [],
    stockInHeaders: [
      { text: '入库任务码', value: 'taskCode' },
      { text: '客户名称', value: 'customerName' },
      { text: '货品名称', value: 'cargoName' },
      { text: '类别名称', value: 'categoryName' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'inWeight' },
      { text: '批次', value: 'batch' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' }
    ],
    stockInTaskData: [],
    stockOutHeaders: [
      { text: '出库任务码', value: 'taskCode' },
      { text: '客户名称', value: 'customerName' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '出库数量', value: 'outCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '出库重量(t)', value: 'outWeight' }
    ],
    stockOutTaskData: [],
    tab: null,
    carryInHeaders: [
      { text: '所属客户', value: 'customerName' },
      { text: '托盘码', value: 'trayCode' },
      { text: '货品名称', value: 'cargoName' },
      { text: '搬运类型', value: 'type' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '上架时间', value: 'moveTime' }
    ],
    carryInListData: [],
    carryOutHeaders: [
      { text: '所属客户', value: 'customerName' },
      { text: '托盘码', value: 'trayCode' },
      { text: '货品名称', value: 'cargoName' },
      { text: '搬运类型', value: 'type' },
      { text: '在库数量', value: 'storeCount' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '下架时间', value: 'moveTime' }
    ],
    carryOutListData: []
  }),
  watch: {
    'search.customerId': function(val) {
      this.loadContract(val)
    }
  },
  computed: {
    // 库存总数量
    totalCount: function() {
      return this.storeListData.reduce(function(acc, cur) {
        return acc + cur.storeCount
      }, 0)
    },
    // 库存总重量
    totalWeight: function() {
      return this.storeListData
        .reduce(function(acc, cur) {
          return acc + cur.storeWeight
        }, 0.0)
        .toFixed(4)
    },
    // 普通库存总数量
    totalNormalCount: function() {
      return this.normalStoreListData.reduce(function(acc, cur) {
        return acc + cur.storeCount
      }, 0)
    },
    // 普通库存总重量
    totalNormalWeight: function() {
      return this.normalStoreListData
        .reduce(function(acc, cur) {
          return acc + cur.storeWeight
        }, 0.0)
        .toFixed(4)
    },
    // 入库总数量
    totalMoveInCount: function() {
      return this.stockInTaskData.reduce((acc, cur) => acc + cur.inCount, 0)
    },
    // 入库总重量
    totalMoveInWeight: function() {
      return this.stockInTaskData.reduce((acc, cur) => acc + cur.inWeight, 0).toFixed(4)
    },
    // 出库总数量
    totalMoveOutCount: function() {
      return this.stockOutTaskData.reduce((acc, cur) => acc + cur.outCount, 0)
    },
    // 出库总重量
    totalMoveOutWeight: function() {
      return this.stockOutTaskData.reduce((acc, cur) => acc + cur.outWeight, 0).toFixed(4)
    }
  },
  methods: {
    // 载入合同
    async loadContract(customerId) {
      if (customerId) {
        this.contractListData = await contract.getList(customerId)
        if (this.contractListData.length > 0) {
          this.search.selectedContract = this.contractListData[0]
        }
      } else {
        this.contractListData = []
      }
    },

    // 搜索库存记录
    async searchStore() {
      if (this.$refs.form.validate()) {
        this.storeListData = await store.findInDay({ contractId: this.search.selectedContract.id, date: this.search.date })
        this.normalStoreListData = await normalStore.findInDay({ contractId: this.search.selectedContract.id, date: this.search.date })
        this.stockInTaskData = await stockIn.getTaskByDate({ date: this.search.date, contractId: this.search.selectedContract.id })
        this.stockOutTaskData = await stockOut.getTaskByDate({ date: this.search.date, contractId: this.search.selectedContract.id })
        this.carryInListData = await carryIn.listByInTime({ contractId: this.search.selectedContract.id, inTime: this.search.date })
        this.carryOutListData = await carryOut.listByOutTime({ contractId: this.search.selectedContract.id, outTime: this.search.date })
      }
    }
  }
}
</script>
