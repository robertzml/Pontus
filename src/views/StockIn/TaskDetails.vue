<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="green darken-1">入库货物信息 </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-card flat class="mx-auto">
            <v-row dense>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDate(taskInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.flowNumber" label="入库单流水号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.stockInType(taskInfo.stockInType)" label="入库类型" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.taskCode" label="入库任务码" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.inCount" label="入库数量" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.inWeight" label="总重量" suffix="吨" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="`${taskInfo.categoryNumber} - ${taskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.specification" label="规格" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.batch" label="批次" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.originPlace" label="产地" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="taskInfo.userName" label="创建人" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(taskInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(taskInfo.finishTime)" label="完成时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayStatus(taskInfo.status)" label="状态" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field v-model="taskInfo.remark" label="备注" hide-details readonly></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn color="indigo darken-3" v-if="this.taskInfo.status == 71 && this.taskInfo.stockInType == 2" @click.stop="showCarryInCreate">
                任务下发
              </v-btn>
              <v-btn color="success darken-1" v-if="this.taskInfo.status == 71" @click.stop="showFinishTask">确认入库货物</v-btn>
              <v-btn color="warning" v-if="taskInfo.status != 75" @click.stop="showEditTask">编辑入库货物</v-btn>
              <v-btn color="red darken-3" v-if="taskInfo.status != 75" @click.stop="showDeleteTask">删除入库货物</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="this.taskInfo.stockInType == 2">
        <v-expansion-panel-header ripple class="green darken-3">
          <template v-slot:default="">
            搬运入库任务
            <v-spacer></v-spacer>
            <span class="subtitle-2">托盘数量: {{ totalTray }}</span>
            <span class="subtitle-2 ml-4">搬运数量: {{ totalMoveCount }}</span>
            <span class="subtitle-2 ml-4">搬运重量: {{ totalMoveWeight }} 吨</span>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="carryInTaskHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary darken-1" @click="showCarryInDetails(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
              <v-btn v-if="item.status == 73" small color="teal darken-3" class="ml-2" @click="showCarryInEnter(item)">
                <v-icon left dark>rowing</v-icon>
                上架
              </v-btn>
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
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- 搬运任务下发组件 -->
    <carry-in-create ref="carryInCreateMod" :stock-in-task="taskInfo" @close="loadCarryInTask"></carry-in-create>

    <!-- 入库任务编辑组件 -->
    <stock-in-task-edit ref="stockInTaskEditMod" :customer-id="taskInfo.customerId" @close="closeEditTask"></stock-in-task-edit>

    <!-- 入库任务确认组件 -->
    <stock-in-task-finish ref="stockInTaskFinishMod" @close="loadStockInTask"></stock-in-task-finish>

    <!-- 入库任务删除组件 -->
    <stock-in-task-delete ref="stockInTaskDeleteMod" @close="stockInShowDetails(taskInfo.stockInId)"></stock-in-task-delete>

    <!-- 搬运入库任务查看组件 -->
    <carry-in-details ref="carryInDetailsMod" @close="loadCarryInTask"></carry-in-details>

    <!-- 搬运入库确认组件 -->
    <carry-in-finish ref="carryInFinishMod" @close="loadCarryInTask"></carry-in-finish>

    <!-- 搬运入库上架组件 -->
    <carry-in-enter ref="carryInEnterMod" @close="loadCarryInTask"></carry-in-enter>

    <!-- 搬运入库删除组件 -->
    <carry-in-delete ref="carryInDeleteMod" @close="loadCarryInTask"></carry-in-delete>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'
import StockInTaskEdit from './Dialog/EditTask'
import StockInTaskFinish from './Dialog/FinishTask'
import StockInTaskDelete from './Dialog/DeleteTask'
import CarryInDetails from '@/components/Dialog/CarryInDetails'
import CarryInCreate from '@/components/Dialog/CarryInCreate'
import CarryInFinish from '@/components/Dialog/CarryInFinish'
import CarryInEnter from '@/components/Dialog/CarryInEnter'
import CarryInDelete from '@/components/Dialog/CarryInDelete'

export default {
  name: 'StockInTaskDetails',
  components: {
    StockInTaskEdit,
    StockInTaskFinish,
    StockInTaskDelete,
    CarryInCreate,
    CarryInDetails,
    CarryInFinish,
    CarryInEnter,
    CarryInDelete
  },
  data: () => ({
    panel: [0, 1],
    viewDrawer: false,
    carryInTaskList: [],
    carryInTaskHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    carryInTask: {}
  }),
  computed: {
    ...mapState({
      /**
       * 入库任务单
       */
      taskInfo: state => state.stockIn.stockInTaskInfo,
      refreshEvent: state => state.stockIn.refreshEvent
    }),
    totalTray: function() {
      return this.carryInTaskList.length
    },
    totalMoveCount: function() {
      let total = 0
      this.carryInTaskList.forEach(item => {
        total += item.moveCount
      })

      return total
    },
    totalMoveWeight: function() {
      let total = 0
      this.carryInTaskList.forEach(item => {
        total += item.moveWeight
      })

      return total.toFixed(4)
    }
  },
  watch: {
    refreshEvent: function() {
      this.loadStockInTask()
      this.loadCarryInTask()
    }
  },
  methods: {
    ...mapMutations({
      setTaskInfo: 'stockIn/setTaskInfo'
    }),

    ...mapActions({
      stockInShowDetails: 'stockIn/showDetails'
    }),

    // 载入入库任务
    loadStockInTask() {
      let vm = this
      stockIn.getTask(this.taskInfo.id).then(res => {
        vm.setTaskInfo(res)
      })
    },

    // 载入搬运入库任务
    loadCarryInTask() {
      let vm = this
      carryIn.listByStockInTask(this.taskInfo.id).then(res => {
        vm.carryInTaskList = res
      })
    },

    // 显示编辑入库任务
    showEditTask() {
      this.$refs.stockInTaskEditMod.init(this.taskInfo.id)
    },

    // 关闭编辑入库任务
    closeEditTask() {
      this.loadStockInTask()
      this.loadCarryInTask()
    },

    // 显示确认入库任务
    showFinishTask() {
      this.$refs.stockInTaskFinishMod.init(this.taskInfo.id)
    },

    // 显示删除入库任务
    showDeleteTask() {
      this.$refs.stockInTaskDeleteMod.init(this.taskInfo.id)
    },

    // 任务下发
    showCarryInCreate() {
      this.$refs.carryInCreateMod.init()
    },

    // 查看搬运入库任务信息
    showCarryInDetails(item) {
      this.$refs.carryInDetailsMod.init(item.id)
    },

    // 显示搬运入库上架
    showCarryInEnter(item) {
      this.$refs.carryInEnterMod.init(item.trayCode)
    },

    // 显示确认搬运入库
    showCarryInFinish(item) {
      this.$refs.carryInFinishMod.init(item.id)
    },

    // 显示删除搬运入库
    showCarryInDelete(item) {
      this.$refs.carryInDeleteMod.init(item.id)
    }
  },
  mounted: function() {
    this.loadCarryInTask()
  }
}
</script>
