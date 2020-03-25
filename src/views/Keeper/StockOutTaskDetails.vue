<template>
  <v-row dense>
    <v-col :cols="taskInfo.stockOutType == 1 ? 12 : 5">
      <v-card class="mb-2">
        <v-subheader class="subtitle-1 orange--text text--lighten-2">出库货物信息</v-subheader>
        <v-card-text>
          <v-row dense>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.taskCode" label="出库任务码" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="`${taskInfo.categoryNumber} - ${taskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.specification" label="规格" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.storeCount" label="在库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.outCount" label="出库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.outWeight" label="出库重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6" v-if="taskInfo.stockOutType == 1">
              <v-text-field v-model="taskInfo.warehouseName" label="所在仓库" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6" v-if="taskInfo.stockOutType == 1">
              <v-text-field v-model="taskInfo.place" label="存放位置" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.userName" label="创建人" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="$util.displayDateTime(taskInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="$util.displayDateTime(taskInfo.finishTime)" label="完成时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="$util.displayStatus(taskInfo.status)" label="状态" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field v-model="taskInfo.remark" label="备注" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success darken-1" v-if="taskInfo.status == 81" @click.stop="showFinishTask">出库货物确认</v-btn>
          <v-btn color="red darken-3" v-if="taskInfo.status != 85" @click.stop="showDeleteTask">删除出库货物</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="7" v-if="taskInfo.stockOutType == 2">
      <v-card class="mb-2">
        <v-subheader class="subtitle-1 purple--text text--lighten-2">
          搬运出库任务
          <v-spacer></v-spacer>
          <span class="subtitle-2">托盘数量: {{ totalOutTray }}</span>
          <span class="subtitle-2 ml-4">搬运数量: {{ totalMoveOutCount }}</span>
          <span class="subtitle-2 ml-4">搬运重量: {{ totalMoveOutWeight }} 吨</span>
        </v-subheader>
        <v-card-text class="px-0">
          <v-data-table :headers="carryOutHeaders" :items="carryOutTaskList" disable-filtering :items-per-page="10">
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn v-if="item.status == 81" small color="red darken-3" class="ml-2" @click="showCarryOutDelete(item)">
                <v-icon left dark>delete</v-icon>
                删除
              </v-btn>
              <v-btn v-if="item.status == 84" small color="success darken-1" class="ml-2" @click="showCarryOutFinish(item)">
                <v-icon left dark>check</v-icon>
                确认
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-card class="mb-2">
        <v-subheader class="subtitle-1 teal--text text--lighten-2">
          搬运入库任务
          <v-spacer></v-spacer>
          <span class="subtitle-2">托盘数量: {{ totalInTray }}</span>
          <span class="subtitle-2 ml-4">搬运数量: {{ totalMoveInCount }}</span>
          <span class="subtitle-2 ml-4">搬运重量: {{ totalMoveInWeight }} 吨</span>
        </v-subheader>
        <v-card-text class="px-0">
          <v-data-table :headers="carryInHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn v-if="item.status == 74" small color="success darken-1" class="ml-2" @click="showCarryInFinish(item)">
                <v-icon left dark>check</v-icon>
                确认
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- 出库任务确认组件 -->
    <stock-out-task-finish ref="stockOutTaskFinishMod" @close="loadStockOutTask"></stock-out-task-finish>

    <!-- 出库任务删除组件 -->
    <stock-out-task-delete ref="stockOutTaskDeleteMod" @close="showStockOutTaskList"></stock-out-task-delete>

    <!-- 搬运出库确认组件 -->
    <carry-out-finish ref="carryOutFinishMod" @close="loadCarryOutList"></carry-out-finish>

    <!-- 搬运出库删除组件 -->
    <carry-out-delete ref="carryOutDeleteMod" @close="loadCarryOutList"></carry-out-delete>

    <!-- 搬运入库确认组件 -->
    <carry-in-finish ref="carryInFinishMod" @close="loadCarryInList"></carry-in-finish>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import carryOut from '@/controllers/carryOut'
import carryIn from '@/controllers/carryIn'
import StockOutTaskFinish from '@/components/Dialog/StockOutTaskFinish'
import StockOutTaskDelete from '@/components/Dialog/StockOutTaskDelete'
import CarryOutFinish from '@/components/Dialog/CarryOutFinish'
import CarryOutDelete from '@/components/Dialog/CarryOutDelete'
import CarryInFinish from '@/components/Dialog/CarryInFinish'

export default {
  name: 'StockOutTaskDetails',
  components: {
    StockOutTaskFinish,
    StockOutTaskDelete,
    CarryOutFinish,
    CarryOutDelete,
    CarryInFinish
  },
  data: () => ({
    taskInfo: {},
    carryOutTaskList: [],
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
    carryInTaskList: [],
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
  watch: {
    refreshEvent: function() {
      this.loadStockOutTask()
      this.loadCarryOutList()
      this.loadCarryInList()
    }
  },
  computed: {
    ...mapState({
      // 传入出库任务ID
      stockOutTaskId: state => state.keeper.stockOutTaskId,
      refreshEvent: state => state.keeper.refreshEvent
    }),
    totalOutTray: function() {
      return this.carryOutTaskList.length
    },
    totalMoveOutCount: function() {
      let total = 0
      this.carryOutTaskList.forEach(item => {
        total += item.moveCount
      })

      return total
    },
    totalMoveOutWeight: function() {
      let total = 0
      this.carryOutTaskList.forEach(item => {
        total += item.moveWeight
      })

      return total.toFixed(4)
    },
    totalInTray: function() {
      return this.carryInTaskList.length
    },
    totalMoveInCount: function() {
      let total = 0
      this.carryInTaskList.forEach(item => {
        total += item.moveCount
      })

      return total
    },
    totalMoveInWeight: function() {
      let total = 0
      this.carryInTaskList.forEach(item => {
        total += item.moveWeight
      })

      return total.toFixed(4)
    }
  },
  methods: {
    ...mapActions({
      showStockOutTaskList: 'keeper/showStockOutTaskList'
    }),

    // 载入出库任务
    loadStockOutTask() {
      let vm = this
      stockOut.getTask(this.stockOutTaskId).then(res => {
        vm.taskInfo = res
      })
    },

    // 载入搬运出库任务
    loadCarryOutList() {
      let vm = this
      carryOut.listByStockOutTask(this.stockOutTaskId).then(res => {
        vm.carryOutTaskList = res
      })
    },

    // 载入临时搬运入库任务
    loadCarryInList() {
      let vm = this
      carryIn.listByStockOutTask(this.stockOutTaskId).then(res => {
        vm.carryInTaskList = res
      })
    },

    // 显示出库任务确认
    showFinishTask() {
      this.$refs.stockOutTaskFinishMod.init(this.stockOutTaskId)
    },

    // 显示删除出库任务
    showDeleteTask() {
      this.$refs.stockOutTaskDeleteMod.init(this.stockOutTaskId)
    },

    // 确认搬运出库任务
    showCarryOutFinish(item) {
      this.$refs.carryOutFinishMod.init(item.id)
    },

    // 删除搬运出库任务
    showCarryOutDelete(item) {
      this.$refs.carryOutDeleteMod.init(item.id)
    },

    // 确认搬运入库
    showCarryInFinish(item) {
      this.$refs.carryInFinishMod.init(item.id)
    }
  },
  mounted: function() {
    this.loadStockOutTask()
    this.loadCarryOutList()
    this.loadCarryInList()
  }
}
</script>
