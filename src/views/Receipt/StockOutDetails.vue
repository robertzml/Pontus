<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-1">出库单信息</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <stock-out-details-view :info="stockOutInfo"> </stock-out-details-view>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-4">
          出库货物
          <v-spacer></v-spacer>
          <span class="subtitle-2 ml-4">出库总数量: {{ totalCount }}</span>
          <span class="subtitle-2 ml-4">出库总重量: {{ totalWeight }} 吨</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="headers" :items="taskInfoList" :items-per-page="10">
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary" @click="viewTaskItem(item)">
                信息
              </v-btn>
              <v-btn small color="success" class="ml-2" @click="viewCarryIn(item)">
                搬入
              </v-btn>
              <v-btn small color="success" class="ml-2" @click="viewCarryOut(item)">
                搬出
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <stock-out-task-details ref="stockOutTaskDetailsMod"></stock-out-task-details>

    <v-bottom-sheet v-model="bottomIn" scrollable>
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

    <v-bottom-sheet v-model="bottomOut" scrollable>
      <v-card flat>
        <v-card-title class="purple darken-3">搬运出库列表</v-card-title>
        <v-card-text style="height: 300px">
          <v-data-table :headers="carryOutTaskHeaders" :items="carryOutTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.moveTime="{ item }">
              {{ item.moveTime | displayDateTime }}
            </template>
            <template v-slot:item.outTime="{ item }">
              {{ item.outTime | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
import stockOut from '@/controllers/stockOut'
import carryIn from '@/controllers/carryIn'
import carryOut from '@/controllers/carryOut'
import StockOutDetailsView from '@/components/View/StockOutDetailsView'
import StockOutTaskDetails from './StockOutTaskDetails'

export default {
  name: 'ReceiptStockInDetails',
  components: {
    StockOutDetailsView,
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
    taskInfoList: [],
    bottomIn: false,
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
    ],
    bottomOut: false,
    carryOutTaskList: [],
    carryOutTaskHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '在库数量', value: 'storeCount' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '清点人', value: 'checkUserName' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '移出时间', value: 'moveTime' },
      { text: '出库日期', value: 'outTime' },
      { text: '状态', value: 'status' }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.receipt.stockOutRefreshEvent,
      stockOutId: state => state.receipt.stockOutId
    }),
    // 出库总数量
    totalCount: function() {
      return this.taskInfoList.reduce(function(acc, cur) {
        return acc + cur.outCount
      }, 0)
    },
    // 出库总重量
    totalWeight: function() {
      return this.taskInfoList
        .reduce(function(acc, cur) {
          return acc + cur.outWeight
        }, 0.0)
        .toFixed(4)
    }
  },
  watch: {
    refreshEvent: function() {
      this.loadStockOut()
      this.loadTaskList()
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
    },

    // 查看搬运清单
    viewCarryIn(item) {
      let vm = this
      carryIn.listByStockOutTask(item.id).then(res => {
        vm.carryInTaskList = res
      })

      this.bottomIn = true
    },

    // 查看搬运出库清点
    viewCarryOut(item) {
      let vm = this
      carryOut.listByStockOutTask(item.id).then(res => {
        vm.carryOutTaskList = res
      })

      this.bottomOut = true
    }
  },
  activated: function() {
    this.loadStockOut()
    this.loadTaskList()
  }
}
</script>
