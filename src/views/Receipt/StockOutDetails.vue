<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-1">出库单信息</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-card flat class="mx-auto">
            <v-row dense>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDate(stockOutInfo.outTime)" label="出库时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="stockOutInfo.monthTime" label="出库月份" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="stockOutInfo.flowNumber" label="流水单号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.stockOutType(stockOutInfo.type)" label="出库类型" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="stockOutInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="stockOutInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="stockOutInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="stockOutInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.contractType(stockOutInfo.contractType)" label="合同类型" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.billingType(stockOutInfo.billingType)" label="计费方式" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field
                  v-model="stockOutInfo.unitPrice"
                  label="冷藏费单价"
                  :suffix="$util.billingTypeUnit(stockOutInfo.billingType)"
                  hide-details
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="3" sm="6">
                <v-text-field label="车牌号" :value="stockOutInfo.vehicleNumber" hide-details readonly> </v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="stockOutInfo.userName" label="登记人" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(stockOutInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(stockOutInfo.confirmTime)" label="确认时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayStatus(stockOutInfo.status)" label="状态" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field label="备注" :value="stockOutInfo.remark" hide-details readonly> </v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-4">出库货物</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="headers" :items="taskInfoList" :items-per-page="5">
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary" @click="viewTaskItem(item)">
                信息
              </v-btn>
              <v-btn small color="success" class="ml-2" @click="viewCarryIn(item)">
                搬运
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <stock-out-task-details ref="stockOutTaskDetailsMod"></stock-out-task-details>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
import stockOut from '@/controllers/stockOut'
import StockOutTaskDetails from './StockOutTaskDetails'

export default {
  name: 'ReceiptStockInDetails',
  components: {
    StockOutTaskDetails
  },
  data: () => ({
    panel: [0, 1],
    stockOutInfo: {},
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
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
  computed: {
    ...mapState({
      refreshEvent: state => state.receipt.stockOutRefreshEvent,
      stockOutId: state => state.receipt.stockOutId
    })
  },
  watch: {
    refreshEvent: function() {
      this.loadStockOut()
      this.loadTaskList()
      // this.stockInTaskInfo = {}
    }
  },
  methods: {
    // 载入出库单信息
    loadStockOut() {
      if (this.stockOutId) {
        let vm = this
        stockOut.get(this.stockOutId).then(res => {
          vm.stockOutInfo = res
        })
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

    // 查看出库任务信息
    viewTaskItem(item) {
      this.$refs.stockOutTaskDetailsMod.init(item.id)
    }
  },
  activated: function() {
    this.loadStockOut()
    this.loadTaskList()
    // this.stockInTaskInfo = {}
  }
}
</script>
