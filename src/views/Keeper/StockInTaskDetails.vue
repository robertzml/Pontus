<template>
  <v-row dense>
    <v-col cols="5">
      <v-card class="mb-2">
        <v-subheader class="subtitle-1 orange--text text--lighten-2">入库货物信息</v-subheader>

        <v-card-text>
          <v-row dense>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.taskCode" label="入库任务码" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.inCount" label="入库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.inWeight" label="总重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="`${taskInfo.categoryNumber} - ${taskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.specification" label="规格" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.batch" label="批次" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.originPlace" label="产地" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
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
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.remark" label="备注" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" v-if="this.taskInfo.status == 71" @click.stop="showCarryInCreate">任务下发</v-btn>
          <v-btn color="success darken-1" v-if="this.taskInfo.status == 71" @click.stop="showFinishTask">确认入库货物</v-btn>
          <v-btn color="error" v-if="this.taskInfo.status != 75" @click.stop="showDeleteTask">删除入库货物</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="7">
      <v-card class="mb-2">
        <v-subheader class="subtitle-1 purple--text text--lighten-2">
          搬运入库任务
          <v-spacer></v-spacer>
          <span class="subtitle-2">托盘数量: {{ totalInTray }}</span>
          <span class="subtitle-2 ml-4">搬运数量: {{ totalMoveInCount }}</span>
          <span class="subtitle-2 ml-4">搬运重量: {{ totalMoveInWeight }} 吨</span>
        </v-subheader>
        <v-card-text class="px-0">
          <v-data-table :headers="carryInTaskHeaders" :items="carryInTaskList" disable-filtering :items-per-page="10">
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn v-if="item.status == 74" small color="success darken-1" class="ml-2" @click="showCarryInFinish(item)">
                <v-icon left dark>check</v-icon>
                确认
              </v-btn>
              <v-btn v-if="item.status == 72" small color="red darken-3" class="ml-2" @click="showCarryInDelete(item)">
                <v-icon left dark>delete</v-icon>
                删除
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- 入库任务删除组件 -->
    <stock-in-task-delete ref="stockInTaskDeleteMod" @close="showStockInTaskList"></stock-in-task-delete>

    <!-- 入库任务确认组件 -->
    <stock-in-task-finish ref="stockInTaskFinishMod" @close="loadStockInTask"></stock-in-task-finish>

    <!-- 搬运任务下发组件 -->
    <carry-in-create ref="carryInCreateMod" @close="loadCarryInList"></carry-in-create>

    <!-- 搬运入库确认组件 -->
    <carry-in-finish ref="carryInFinishMod" @close="loadCarryInList"></carry-in-finish>

    <!-- 搬运入库删除组件 -->
    <carry-in-delete ref="carryInDeleteMod" @close="loadCarryInList"></carry-in-delete>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'
import StockInTaskFinish from '@/components/Dialog/StockInTaskFinish'
import StockInTaskDelete from '@/components/Dialog/StockInTaskDelete'
import CarryInCreate from '@/components/Dialog/CarryInCreate'
import CarryInFinish from '@/components/Dialog/CarryInFinish'
import CarryInDelete from '@/components/Dialog/CarryInDelete'

export default {
  name: 'StockInTaskDetails',
  components: {
    StockInTaskFinish,
    StockInTaskDelete,
    CarryInCreate,
    CarryInFinish,
    CarryInDelete
  },
  data: () => ({
    taskInfo: {},
    carryInTaskList: [],
    carryInTaskHeaders: [
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
      this.loadStockInTask()
      this.loadCarryInList()
    }
  },
  computed: {
    ...mapState({
      // 传入入库任务ID
      stockInTaskId: state => state.keeper.stockInTaskId,
      refreshEvent: state => state.keeper.refreshEvent
    }),
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
      showStockInTaskList: 'keeper/showStockInTaskList'
    }),

    // 载入入库任务
    loadStockInTask() {
      let vm = this
      stockIn.getTask(this.stockInTaskId).then(res => {
        vm.taskInfo = res
      })
    },

    // 载入搬运入库任务
    loadCarryInList() {
      let vm = this
      carryIn.listByStockInTask(this.stockInTaskId).then(res => {
        vm.carryInTaskList = res
      })
    },

    // 显示确认入库任务
    showFinishTask() {
      this.$refs.stockInTaskFinishMod.init(this.stockInTaskId)
    },

    // 显示删除入库任务
    showDeleteTask() {
      this.$refs.stockInTaskDeleteMod.init(this.stockInTaskId)
    },

    // 下发任务
    showCarryInCreate() {
      this.$refs.carryInCreateMod.init(this.taskInfo)
    },

    // 显示确认搬运入库
    showCarryInFinish(item) {
      this.$refs.carryInFinishMod.init(item.id)
    },

    // 显示删除搬运入库任务
    showCarryInDelete(item) {
      this.$refs.carryInDeleteMod.init(item.id)
    }
  },
  mounted: function() {
    this.loadStockInTask()
    this.loadCarryInList()
  }
}
</script>
