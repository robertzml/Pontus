<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="cyan darken-1">入库单信息</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <stock-in-details-view :info="stockInInfo"> </stock-in-details-view>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="cyan darken-4">
          入库货物
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 ml-4">入库总数量: {{ totalCount }}</span>
          <span class="text-subtitle-2 ml-4">入库总重量: {{ totalWeight }} 吨</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="headers" :items="taskInfoList" :items-per-page="10">
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary" @click="viewTaskItem(item)"> 信息 </v-btn>
              <v-btn small color="success" class="ml-2" @click="viewCarryIn(item)"> 搬运 </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <stock-in-task-details ref="stockInTaskDetailsMod"></stock-in-task-details>

    <v-bottom-sheet v-model="bottom" scrollable>
      <v-card flat>
        <v-card-title class="lime darken-3">搬运入库列表</v-card-title>
        <v-card-text style="height: 300px">
          <v-data-table :headers="carryInTaskHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.moveTime="{ item }">
              {{ item.moveTime | displayDateTime }}
            </template>
            <template v-slot:item.inTime="{ item }">
              {{ item.inTime | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'
import StockInTaskDetails from './StockInTaskDetails'
import StockInDetailsView from '@/components/View/StockInDetailsView'

export default {
  name: 'ReceiptStockInDetails',
  components: {
    StockInTaskDetails,
    StockInDetailsView
  },
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
      { text: '货架码', value: 'shelfCode' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '清点人', value: 'checkUserName' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '移入时间', value: 'moveTime' },
      { text: '入库日期', value: 'inTime' },
      { text: '状态', value: 'status' }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: (state) => state.receipt.stockInRefreshEvent,
      stockInId: (state) => state.receipt.stockInId
    }),
    // 入库总数量
    totalCount: function () {
      return this.taskInfoList.reduce(function (acc, cur) {
        return acc + cur.inCount
      }, 0)
    },
    // 入库总重量
    totalWeight: function () {
      return this.taskInfoList
        .reduce(function (acc, cur) {
          return acc + cur.inWeight
        }, 0.0)
        .toFixed(4)
    }
  },
  watch: {
    stockInId: function () {
      // this.loadStockIn()
    },
    refreshEvent: function () {
      this.loadStockIn()
      this.loadTaskList()
      this.stockInTaskInfo = {}
    }
  },
  methods: {
    loadStockIn() {
      if (this.stockInId) {
        let vm = this
        stockIn.find(this.stockInId).then((res) => {
          vm.stockInInfo = res
        })
      }
    },

    // 载入入库任务列表
    loadTaskList() {
      if (this.stockInId) {
        let vm = this
        stockIn.getTaskList(this.stockInId).then((res) => {
          vm.taskInfoList = res
        })
      } else {
        this.taskInfoList = []
      }
    },

    // 查看入库任务信息
    viewTaskItem(item) {
      this.$refs.stockInTaskDetailsMod.init(item.id)
    },

    // 查看搬运清单
    viewCarryIn(item) {
      // this.panel = [1]
      this.stockInTaskInfo = item
      let vm = this
      carryIn.listByStockInTask(item.id).then((res) => {
        vm.carryInTaskList = res
      })

      this.bottom = true
    }
  },
  activated: function () {
    this.loadStockIn()
    this.loadTaskList()
    this.stockInTaskInfo = {}
  }
}
</script>
