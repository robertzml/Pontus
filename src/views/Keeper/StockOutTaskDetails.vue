<template>
  <v-row dense>
    <v-col cols="5">
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
          <v-btn color="primary" v-if="taskInfo.status == 81" @click.stop="showCarryOutCreate">任务下发</v-btn>
          <v-btn color="deep-orange darken-3" v-if="taskInfo.status == 81" @click.stop="showFinishTask">出库货物确认</v-btn>
          <v-btn color="red darken-3" v-if="taskInfo.status != 85" @click.stop="showDeleteTask">删除出库货物</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="7">
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

    <!-- 下发搬运出库任务组件 -->
    <carry-out-create ref="carryOutCreateMod" @close="loadCarryOutList"></carry-out-create>

    <!-- 搬运出库确认组件 -->
    <carry-out-finish ref="carryOutFinishMod" @close="loadCarryOutList"></carry-out-finish>

    <!-- 搬运出库删除组件 -->
    <carry-out-delete ref="carryOutDeleteMod" @close="loadCarryOutList"></carry-out-delete>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import carryOut from '@/controllers/carryOut'
import carryIn from '@/controllers/carryIn'
import CarryOutCreate from '@/components/Dialog/CarryOutCreate'
import CarryOutFinish from '@/components/Dialog/CarryOutFinish'
import CarryOutDelete from '@/components/Dialog/CarryOutDelete'

export default {
  name: 'StockOutTaskDetails',
  components: {
    CarryOutCreate,
    CarryOutFinish,
    CarryOutDelete
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
      carryIn.listByStockOutTask(this.taskInfo.id).then(res => {
        vm.carryInTaskList = res
      })
    },

    // 显示确认出库任务
    showFinishTask() {
      this.$refs.stockInTaskFinishMod.init(this.stockOutTaskId)
    },

    // 显示删除出库任务
    showDeleteTask() {
      this.$refs.stockInTaskDeleteMod.init(this.stockOutTaskId)
    },

    // 下发搬运任务
    showCarryOutCreate() {
      this.$refs.carryOutCreateMod.init(this.stockOutTaskId)
    },

    // 确认搬运出库任务
    showCarryOutFinish(item) {
      this.$refs.carryOutFinishMod.init(item.id)
    },

    // 删除搬运出库任务
    showCarryOutDelete(item) {
      this.$refs.carryOutDeleteMod.init(item.id)
    },

    // 显示确认搬运出库
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
