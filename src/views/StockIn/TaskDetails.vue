<template>
  <v-sheet class="transparent">
    <v-card flat class="mx-auto mb-2 brown darken-2">
      <v-card-title class="cyan">
        入库货物信息
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDate(info.inTime)" label="入库时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.flowNumber" label="入库单流水号" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.stockInType(info.stockInType)" label="入库类型" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.taskCode" label="入库任务码" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.cargoName" label="货品名称" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.inCount" label="入库数量" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.inWeight" label="总重量" suffix="吨" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="`${info.categoryNumber} - ${info.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.specification" label="规格" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.batch" label="批次" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.originPlace" label="产地" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.userName" label="创建人" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDateTime(info.finishTime)" label="完成时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayStatus(info.status)" label="状态" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field v-model="info.remark" label="备注" hide-details readonly></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn color="indigo darken-3" v-if="this.info.status == 71" @click.stop="showCarryInCreate">任务下发</v-btn>
        <v-btn color="success darken-1" v-if="this.info.status == 71" @click.stop="finishDialog = true">确认入库货物</v-btn>
        <v-btn color="warning" v-if="info.status != 75" @click.stop="showEditTask">编辑入库货物</v-btn>
        <v-btn color="red darken-3" v-if="info.status != 75" @click.stop="deleteDialog = true">删除入库货物</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mx-auto">
      <v-card-title class="deep-purple">
        搬运入库任务
        <v-spacer> </v-spacer>
        <span class="subtitle-2">托盘数量: {{ totalTray }}</span>
        <span class="subtitle-2 ml-4">搬运数量: {{ totalMoveCount }}</span>
        <span class="subtitle-2 ml-4">搬运重量: {{ totalMoveWeight }} 吨</span>
      </v-card-title>
      <v-card-text class="px-0">
        <v-data-table :headers="carryInTaskHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
          <template v-slot:item.status="{ item }">
            {{ item.status | displayStatus }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn small color="primary darken-1" @click="viewCarryInDetails(item)">
              <v-icon left dark>pageview</v-icon>
              查看
            </v-btn>
            <v-btn v-if="item.status == 74" small color="success darken-1" class="ml-2" @click="showConfirmCarryIn(item)">
              <v-icon left dark>check</v-icon>
              确认
            </v-btn>
            <v-btn v-if="item.status == 72" small color="red darken-3" class="ml-2" @click="deleteCarryIn(item)">
              <v-icon left dark>delete</v-icon>
              删除
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-navigation-drawer v-model="viewDrawer" fixed temporary right width="420">
      <carry-in-details :carry-in-task="carryInTask" @close="closeCarryInDetails"></carry-in-details>
    </v-navigation-drawer>

    <stock-in-task-edit ref="stockInTaskEditMod" :customer-id="info.customerId" @close="closeEditTask"></stock-in-task-edit>
    <carry-in-create ref="carryInCreateMod" :stock-in-task="info" @close="loadCarryInTask"></carry-in-create>
    <carry-in-finish ref="carryInFinishMod" @close="loadCarryInTask"></carry-in-finish>

    <v-dialog v-model="finishDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">入库货物确认</v-card-title>
        <v-card-text>是否确认该货物已经入库完成？请确认所有搬运任务已经上架，确认后无法再下发任务。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="finishDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="finishLoading" @click="finishTask">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">删除入库货物</v-card-title>
        <v-card-text>是否确认删除该入库货物？仅能删除未下发搬运任务的入库货物。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="deleteDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="deleteLoading" @click="deleteTask">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'
import StockInTaskEdit from './EditTask'
import CarryInDetails from '../CarryIn/Details'
import CarryInCreate from '@/components/Dialog/CarryInCreate'
import CarryInFinish from '@/components/Dialog/CarryInFinish'

export default {
  name: 'StockInTaskDetails',
  components: {
    StockInTaskEdit,
    CarryInCreate,
    CarryInDetails,
    CarryInFinish
  },
  data: () => ({
    viewDrawer: false,
    finishLoading: false,
    finishDialog: false,
    deleteDialog: false,
    deleteLoading: false,
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
      info: state => state.stockIn.stockInTaskInfo,
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

      return total.toFixed(3)
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

    loadStockInTask() {
      let vm = this
      stockIn.getTask(this.info.id).then(res => {
        vm.setTaskInfo(res)
      })
    },

    loadCarryInTask() {
      let vm = this
      carryIn.listByStockInTask(this.info.id).then(res => {
        vm.carryInTaskList = res
      })
    },

    // 任务下发
    showCarryInCreate() {
      this.$refs.carryInCreateMod.init()
    },

    // 查看搬运入库任务信息
    viewCarryInDetails(item) {
      this.carryInTask = item
      this.viewDrawer = true
    },

    // 关闭入库搬运信息
    closeCarryInDetails(update) {
      this.viewDrawer = false
      if (update) {
        this.loadCarryInTask()
      }
    },

    // 完成任务
    finishTask() {
      let vm = this
      this.$nextTick(() => {
        this.finishLoading = true
      })

      stockIn.finishTask({ taskId: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '确认任务成功')
          vm.loadStockInTask()
          vm.finishLoading = false
          vm.finishDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.finishLoading = false
        }
      })
    },

    // 显示编辑入库任务
    showEditTask() {
      this.$refs.stockInTaskEditMod.init(this.info.id)
    },

    // 关闭编辑入库任务
    closeEditTask() {
      this.loadStockInTask()
      this.loadCarryInTask()
    },

    // 删除入库任务
    deleteTask() {
      let vm = this
      this.$nextTick(() => {
        this.deleteLoading = true
      })

      stockIn.deleteTask({ taskId: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除任务成功')
          vm.stockInShowDetails()
          vm.deleteLoading = false
          vm.deleteDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.deleteLoading = false
        }
      })
    },

    // 确认搬运入库
    showConfirmCarryIn(item) {
      this.$refs.carryInFinishMod.init(item.id)
    },

    // 删除搬运入库
    deleteCarryIn(item) {
      if (confirm('是否删除该搬运任务')) {
        let vm = this
        carryIn.delete({ id: item.id }).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '删除搬运入库任务成功')
            vm.loadCarryInTask()
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    }
  },
  mounted: function() {
    this.loadCarryInTask()
  }
}
</script>
