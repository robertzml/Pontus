<template>
  <v-sheet class="transparent">
    <v-card flat class="mx-auto mb-2">
      <v-card-title class="cyan">
        出库货物信息
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-row dense>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayDate(info.outTime)" label="出库时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.flowNumber" label="出库单流水号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.stockOutType(info.stockOutType)" label="出库类型" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.taskCode" label="出库任务码" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.cargoName" label="货品名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="`${info.categoryNumber} - ${info.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.specification" label="规格" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.storeCount" label="在库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.outCount" label="出库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.outWeight" label="出库重量" suffix="吨" hide-details readonly></v-text-field>
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
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" v-if="this.info.status == 81" @click.stop="showCarryOut">任务下发</v-btn>
        <v-btn color="deep-orange darken-3" v-if="this.info.status == 81" @click.stop="showFinish">出库货物确认</v-btn>
        <v-btn color="red darken-3" v-if="info.status != 85" @click.stop="deleteDialog = true">删除出库货物</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mx-auto mb-2">
      <v-card-title class="orange">
        搬运出库任务
      </v-card-title>
      <v-card-text class="px-0">
        <v-data-table :headers="carryOutHeaders" :items="carryOutTaskList" hide-default-footer disable-filtering disable-pagination>
          <template v-slot:item.type="{ item }">
            {{ item.type | carryOutTaskType }}
          </template>
          <template v-slot:item.status="{ item }">
            {{ item.status | displayStatus }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn small color="primary" @click="viewCarryOutDetails(item)">
              <v-icon left dark>pageview</v-icon>
              查看
            </v-btn>
            <v-btn v-if="item.status == 81" small color="red darken-3" class="ml-2" @click="deleteCarryOut(item)">
              <v-icon left dark>delete</v-icon>
              删除
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-card class="mx-auto">
      <v-card-title class="brown">
        搬运入库任务
      </v-card-title>
      <v-card-text class="px-0">
        <v-data-table :headers="carryInHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
          <template v-slot:item.status="{ item }">
            {{ item.status | displayStatus }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn small color="primary" @click="viewCarryInDetails(item)">
              <v-icon left dark>pageview</v-icon>
              查看
            </v-btn>
            <v-btn v-if="item.status == 74" small color="success darken-1" class="ml-2" @click="showConfirmCarryIn(item)">
              <v-icon left dark>check</v-icon>
              确认
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- 搬运入库确认组件 -->
    <carry-in-finish ref="carryInFinishMod" @close="loadCarryInTask"></carry-in-finish>

    <v-dialog v-model="carryOutDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <carry-out-create @close="closeCarryOut"></carry-out-create>
    </v-dialog>

    <v-navigation-drawer v-model="viewOutDrawer" fixed temporary right width="420">
      <carry-out-details @close="closeCarryOutDetails"></carry-out-details>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="viewInDrawer" fixed temporary right width="420">
      <carry-in-details :carry-in-task="carryInTask" @close="closeCarryInDetails"></carry-in-details>
    </v-navigation-drawer>

    <v-dialog v-model="finishDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">出库货物确认</v-card-title>
        <v-card-text>是否确认该货物已经出库完成？请确认所有搬运任务已经下架，确认后无法再下发任务。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="finishDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text @click="finishTask" :loading="finishLoading">确定</v-btn>
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
          <v-btn color="green darken-1" text @click="deleteTask" :loading="deleteLoading">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import carryOut from '@/controllers/carryOut'
import carryIn from '@/controllers/carryIn'
import CarryOutCreate from '../CarryOut/Create'
import CarryOutDetails from '../CarryOut/Details'
import CarryInDetails from '../CarryIn/Details'
import CarryInFinish from '@/components/Dialog/CarryInFinish'

export default {
  name: 'StockOutTaskDetails',
  props: {},
  components: {
    CarryOutCreate,
    CarryOutDetails,
    CarryInDetails,
    CarryInFinish
  },
  data: () => ({
    viewOutDrawer: false,
    viewInDrawer: false,
    finishLoading: false,
    finishDialog: false,
    deleteLoading: false,
    deleteDialog: false,
    carryOutTaskList: [],
    carryInTaskList: [],
    carryOutHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运类型', value: 'type' },
      { text: '搬运数量', value: 'moveCount' },
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
    ],
    carryInTask: {}
  }),
  computed: {
    ...mapState({
      info: state => state.stockOut.stockOutTaskInfo,
      refreshEvent: state => state.stockOut.refreshEvent
    }),
    carryOutDialog: {
      get() {
        return this.$store.state.stockOut.carryOutDialog
      },
      set(val) {
        this.setCarryOutDialog(val)
      }
    }
  },
  watch: {
    refreshEvent: function() {
      this.loadStockOutTask()
      this.loadCarryOutTask()
      this.loadCarryInTask()
    }
  },
  methods: {
    ...mapMutations({
      setTaskInfo: 'stockOut/setTaskInfo',
      setCarryOutDialog: 'stockOut/setCarryOutDialog',
      setCarryOutTaskInfo: 'stockOut/setCarryOutTaskInfo'
    }),

    ...mapActions({
      stockOutShowDetails: 'stockOut/showDetails'
    }),

    loadStockOutTask() {
      let vm = this
      stockOut.getTask(this.info.id).then(res => {
        vm.setTaskInfo(res)
      })
    },

    // 载入搬运出库任务
    loadCarryOutTask() {
      let vm = this
      carryOut.listByStockOutTask(this.info.id).then(res => {
        vm.carryOutTaskList = res
      })
    },

    // 载入临时搬运入库任务
    loadCarryInTask() {
      let vm = this
      carryIn.listByStockOutTask(this.info.id).then(res => {
        vm.carryInTaskList = res
      })
    },

    // 下发搬运任务
    showCarryOut() {
      this.carryOutDialog = true
    },

    // 关闭下发搬运任务
    closeCarryOut() {
      this.loadCarryOutTask()
    },

    // 查看搬运出库任务
    viewCarryOutDetails(item) {
      this.setCarryOutTaskInfo(item)
      this.viewOutDrawer = true
    },

    // 关闭查看搬运出库任务
    closeCarryOutDetails(update) {
      this.viewOutDrawer = false
      if (update) {
        this.loadCarryOutTask()
        this.loadCarryInTask()
      }
    },

    // 查看搬运入库任务
    viewCarryInDetails(item) {
      this.carryInTask = item
      this.viewInDrawer = true
    },

    // 关闭查看搬运入库任务
    closeCarryInDetails(update) {
      this.viewInDrawer = false
      if (update) {
        this.loadCarryInTask()
      }
    },

    showFinish() {
      this.finishDialog = true
    },

    // 完成任务
    finishTask() {
      let vm = this
      this.$nextTick(() => {
        this.finishLoading = true
      })

      stockOut.finishTask({ taskId: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '确认任务成功')
          vm.loadStockOutTask()
          vm.finishLoading = false
          vm.finishDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.finishLoading = false
        }
      })
    },

    // 删除出库任务
    deleteTask() {
      let vm = this
      this.$nextTick(() => {
        this.deleteLoading = true
      })

      stockOut.deleteTask({ taskId: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除任务成功')
          vm.stockOutShowDetails()
          vm.deleteLoading = false
          vm.deleteDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.deleteLoading = false
        }
      })
    },

    // 删除搬运出库
    deleteCarryOut(item) {
      if (confirm('是否删除该搬运任务')) {
        let vm = this
        carryOut.delete({ id: item.id }).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '删除搬运出库任务成功')
            vm.loadCarryOutTask()
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    },

    // 确认搬运入库
    showConfirmCarryIn(item) {
      this.$refs.carryInFinishMod.init(item.id)
    }
  },
  mounted: function() {
    this.carryInTask = {}
    this.loadCarryOutTask()
    this.loadCarryInTask()
  }
}
</script>
