<template>
  <v-row dense>
    <v-col cols="12">
      <v-expansion-panels v-model="panel" hover multiple>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>入库单信息</v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <v-card flat>
              <v-row dense>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDate(stockInInfo.inTime)" label="入库时间" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.monthTime" label="入库月份" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.flowNumber" label="流水单号" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.stockInType(stockInInfo.type)" label="入库类型" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.customerNumber" label="客户编号" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.customerName" label="客户名称" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.contractNumber" label="合同编号" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.contractName" label="合同名称" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.contractType(stockInInfo.contractType)" label="合同类型" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.billingType(stockInInfo.billingType)" label="计费方式" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field
                    v-model="stockInInfo.unitPrice"
                    label="冷藏费单价"
                    :suffix="$util.billingTypeUnit(stockInInfo.billingType)"
                    readonly
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.vehicleNumber" label="车牌号" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="stockInInfo.userName" label="登记人" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDateTime(stockInInfo.createTime)" label="创建时间" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDateTime(stockInInfo.confirmTime)" label="确认时间" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayStatus(stockInInfo.status)" label="状态" readonly hide-details></v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <v-text-field label="备注" :value="stockInInfo.remark" readonly hide-details> </v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="6"> </v-col>
              </v-row>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header ripple>入库货物</v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <v-data-table :headers="headers" :items="taskInfoList" :items-per-page="5">
              <template v-slot:item.status="{ item }">
                {{ item.status | displayStatus }}
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn small color="primary" @click="viewTaskItem(item)">
                  信息
                </v-btn>
                <v-btn small color="success" @click="viewCarryIn(item)">
                  搬运
                </v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <v-bottom-sheet v-model="bottom" scrollable>
      <v-card flat>
        <v-card-title class="lime darken-3">搬运入库列表</v-card-title>
        <v-card-text style="height: 300px">
          <v-data-table :headers="carryInTaskHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary darken-1" @click="viewCarryInDetails(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'

export default {
  name: 'ReceiptStockInDetails',
  data: () => ({
    panel: [0, 1],
    stockInInfo: {},
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '类别名称', value: 'categoryName' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'inWeight' },
      { text: '批次', value: 'batch' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: [],
    stockInTaskInfo: {},
    bottom: false,
    carryInTaskList: [],
    carryInTaskHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '清点人', value: 'checkUserName' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.receipt.refreshEvent,
      stockInId: state => state.receipt.stockInId
    })
  },
  watch: {
    stockInId: function() {
      // this.loadStockIn()
    },
    refreshEvent: function() {
      this.loadStockIn()
      this.loadTaskList()
      this.stockInTaskInfo = {}
    }
  },
  methods: {
    loadStockIn() {
      if (this.stockInId) {
        let vm = this
        stockIn.get(this.stockInId).then(res => {
          vm.stockInInfo = res
        })
      }
    },

    // 载入入库任务列表
    loadTaskList() {
      if (this.stockInId) {
        let vm = this
        stockIn.getTaskList(this.stockInId).then(res => {
          vm.taskInfoList = res
        })
      } else {
        this.taskInfoList = []
      }
    },

    viewTaskItem(item) {},

    // 查看搬运清单
    viewCarryIn(item) {
      // this.panel = [1]
      this.stockInTaskInfo = item
      let vm = this
      carryIn.listByStockInTask(item.id).then(res => {
        vm.carryInTaskList = res
      })

      this.bottom = true
    }
  },
  activated: function() {
    this.loadStockIn()
    this.loadTaskList()
    this.stockInTaskInfo = {}
  }
}
</script>
