<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="brown darken-1">出库货物信息 </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <stock-out-task-details-view :task-info="taskInfo">
            <template v-slot:action>
              <v-btn color="cyan darken-2" v-if="taskInfo.stockOutType == 2 && taskInfo.status == 81" @click="showScanTray">扫托盘码出库</v-btn>
              <v-btn color="success darken-1" v-if="taskInfo.status == 81" @click.stop="showFinishTask">出库货物确认</v-btn>
              <v-btn color="warning" v-if="taskInfo.stockOutType == 1 && taskInfo.status == 81" @click.stop="showEditTask">编辑出库货物</v-btn>
              <v-btn color="red darken-3" v-if="taskInfo.status != 85" @click.stop="showDeleteTask">删除出库货物</v-btn>
            </template>
          </stock-out-task-details-view>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="this.taskInfo.stockOutType == 2">
        <v-expansion-panel-header ripple class="brown darken-3">
          搬运出库任务
          <v-spacer></v-spacer>
          <span class="text-subtitle-2">托盘数量: {{ totalOutTray }}</span>
          <span class="text-subtitle-2 ml-4">搬运数量: {{ totalMoveOutCount }}</span>
          <span class="text-subtitle-2 ml-4">已出库数量: {{ finishMoveOutCount }}</span>
          <span class="text-subtitle-2 ml-4">搬运重量: {{ totalMoveOutWeight }} 吨</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="carryOutHeaders" :items="carryOutTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:[`item.type`]="{ item }">
              {{ item.type | carryOutTaskType }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <span :class="{ 'orange--text': item.status != 85 }">{{ item.status | displayStatus }}</span>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn small color="primary" @click="viewCarryOutDetails(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
              <v-btn v-if="taskInfo.status != 85" small color="warning" class="ml-2" @click="showCarryOutEdit(item)">
                <v-icon left dark>edit</v-icon>
                编辑
              </v-btn>
              <v-btn v-if="item.status == 81" small color="red darken-3" class="ml-2" @click="showCarryOutDelete(item)">
                <v-icon left dark>delete</v-icon>
                删除
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="this.taskInfo.stockOutType == 2">
        <v-expansion-panel-header ripple class="brown darken-4">
          搬运入库任务
          <v-spacer></v-spacer>
          <span class="text-subtitle-2">托盘数量: {{ totalInTray }}</span>
          <span class="text-subtitle-2 ml-4">搬运数量: {{ totalMoveInCount }}</span>
          <span class="text-subtitle-2 ml-4">已入库数量: {{ finishMoveInCount }}</span>
          <span class="text-subtitle-2 ml-4">搬运重量: {{ totalMoveInWeight }} 吨</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="carryInHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:[`item.status`]="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn small color="primary" @click="viewCarryInDetails(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
              <v-btn v-if="item.status == 72" small color="teal darken-3" class="ml-2" @click="showCarryInEnter(item)">
                <v-icon left dark>rowing</v-icon>
                上架
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- 出库任务确认组件 -->
    <stock-out-task-finish ref="stockOutTaskFinishMod" @close="loadStockOutTask"></stock-out-task-finish>

    <!-- 出库任务编辑组件 -->
    <stock-out-task-edit ref="stockOutTaskEditMod" @close="loadStockOutTask"></stock-out-task-edit>

    <!-- 出库任务删除组件 -->
    <stock-out-task-delete ref="stockOutTaskDeleteMod" @close="stockOutShowDetails(taskInfo.stockOutId)"></stock-out-task-delete>

    <!-- 扫托盘码出库组件 -->
    <scan-tray-out ref="scanMod" @close="refresh"></scan-tray-out>

    <!-- 搬运出库信息组件 -->
    <carry-out-details ref="carryOutDetailsMod"></carry-out-details>

    <!-- 搬运出库删除组件 -->
    <carry-out-delete ref="carryOutDeleteMod" @close="refresh"></carry-out-delete>

    <!-- 搬运出库编辑组件 -->
    <carry-out-edit ref="carryOutEditMod" @close="refresh"></carry-out-edit>

    <!-- 搬运入库信息组件 -->
    <carry-in-details ref="carryInDetailsMod"></carry-in-details>

    <!-- 搬运入库上架组件 -->
    <carry-in-enter ref="carryInEnterMod" @close="loadCarryInTask"></carry-in-enter>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import carryOut from '@/controllers/carryOut'
import carryIn from '@/controllers/carryIn'
import StockOutTaskDetailsView from '@/components/View/StockOutTaskDetailsView'
import StockOutTaskFinish from '@/components/Dialog/StockOutTaskFinish'
import StockOutTaskEdit from '@/components/Dialog/StockOutTaskEdit'
import StockOutTaskDelete from '@/components/Dialog/StockOutTaskDelete'
import ScanTrayOut from '@/components/Dialog/ScanTrayOut'
import CarryOutDetails from '@/components/Dialog/CarryOutDetails'
import CarryOutDelete from '@/components/Dialog/CarryOutDelete'
import CarryOutEdit from '@/components/Dialog/CarryOutEdit'
import CarryInDetails from '@/components/Dialog/CarryInDetails'
import CarryInEnter from '@/components/Dialog/CarryInEnter'

export default {
  name: 'StockOutTaskDetails',
  props: {},
  components: {
    StockOutTaskFinish,
    StockOutTaskEdit,
    StockOutTaskDelete,
    StockOutTaskDetailsView,
    ScanTrayOut,
    CarryOutDetails,
    CarryOutDelete,
    CarryOutEdit,
    CarryInDetails,
    CarryInEnter
  },
  data: () => ({
    panel: [0, 1, 2],
    carryOutTaskList: [],
    carryInTaskList: [],
    carryOutHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '在库数量', value: 'storeCount' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    carryInHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      taskInfo: (state) => state.stockOut.stockOutTaskInfo,
      refreshEvent: (state) => state.stockOut.refreshEvent
    }),
    totalOutTray: function () {
      return this.carryOutTaskList.length
    },
    finishMoveOutCount: function () {
      let total = 0
      this.carryOutTaskList.forEach((item) => {
        if (item.status == 85) {
          total += item.moveCount
        }
      })

      return total
    },
    totalMoveOutCount: function () {
      let total = 0
      this.carryOutTaskList.forEach((item) => {
        total += item.moveCount
      })

      return total
    },
    totalMoveOutWeight: function () {
      let total = 0
      this.carryOutTaskList.forEach((item) => {
        total += item.moveWeight
      })

      return total.toFixed(4)
    },
    totalInTray: function () {
      return this.carryInTaskList.length
    },
    finishMoveInCount: function () {
      let total = 0
      this.carryInTaskList.forEach((item) => {
        if (item.status == 75) {
          total += item.moveCount
        }
      })

      return total
    },
    totalMoveInCount: function () {
      let total = 0
      this.carryInTaskList.forEach((item) => {
        total += item.moveCount
      })

      return total
    },
    totalMoveInWeight: function () {
      let total = 0
      this.carryInTaskList.forEach((item) => {
        total += item.moveWeight
      })

      return total.toFixed(4)
    }
  },
  watch: {
    refreshEvent: function () {
      this.loadStockOutTask()
      if (this.taskInfo.stockOutType == 2) {
        this.loadCarryOutTask()
        this.loadCarryInTask()
      }
    }
  },
  methods: {
    ...mapMutations({
      setTaskInfo: 'stockOut/setTaskInfo',
      refresh: 'stockOut/refresh'
    }),

    ...mapActions({
      stockOutShowDetails: 'stockOut/showDetails'
    }),

    loadStockOutTask() {
      let vm = this
      stockOut.getTask(this.taskInfo.id).then((res) => {
        vm.setTaskInfo(res)
      })
    },

    // 载入搬运出库任务
    loadCarryOutTask() {
      let vm = this
      carryOut.listByStockOutTask(this.taskInfo.id).then((res) => {
        vm.carryOutTaskList = res
      })
    },

    // 载入临时搬运入库任务
    loadCarryInTask() {
      let vm = this
      carryIn.listByStockOutTask(this.taskInfo.id).then((res) => {
        vm.carryInTaskList = res
      })
    },

    // 显示出库任务确认
    showFinishTask() {
      this.$refs.stockOutTaskFinishMod.init(this.taskInfo.id)
    },

    // 显示编辑出库任务
    showEditTask() {
      this.$refs.stockOutTaskEditMod.init(this.taskInfo.id)
    },

    // 显示删除出库任务
    showDeleteTask() {
      this.$refs.stockOutTaskDeleteMod.init(this.taskInfo.id)
    },

    // 显示扫码出库
    showScanTray() {
      this.$refs.scanMod.init(this.taskInfo.stockOutId)
    },

    // 查看搬运出库任务
    viewCarryOutDetails(item) {
      this.$refs.carryOutDetailsMod.init(item.id)
    },

    // 编辑搬运出库任务
    showCarryOutEdit(item) {
      this.$refs.carryOutEditMod.init(item.id)
    },

    // 删除搬运出库任务
    showCarryOutDelete(item) {
      this.$refs.carryOutDeleteMod.init(item.id)
    },

    // 查看搬运入库任务
    viewCarryInDetails(item) {
      this.$refs.carryInDetailsMod.init(item.id)
    },

    // 显示搬运入库上架
    showCarryInEnter(item) {
      this.$refs.carryInEnterMod.init(item.trayCode)
    }
  },
  mounted: function () {
    if (this.taskInfo.stockOutType == 2) {
      this.loadCarryOutTask()
      this.loadCarryInTask()
    }
  }
}
</script>
