<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="brown darken-1">出库货物信息 </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-card flat class="mx-auto">
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

            <v-card-actions>
              <v-btn color="primary" v-if="this.info.status == 81" @click.stop="showCarryOutCreate">任务下发</v-btn>
              <v-btn color="deep-orange darken-3" v-if="this.info.status == 81" @click.stop="showFinishTask">出库货物确认</v-btn>
              <v-btn color="red darken-3" v-if="info.status != 85" @click.stop="showDeleteTask">删除出库货物</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="brown darken-3">搬运出库任务 </v-expansion-panel-header>
        <v-expansion-panel-content eager>
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
              <v-btn v-if="item.status == 84" small color="success darken-1" class="ml-2" @click="showCarryOutFinish(item)">
                <v-icon left dark>check</v-icon>
                确认
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="brown darken-4">搬运入库任务 </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="carryInHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary" @click="viewCarryInDetails(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
              <v-btn v-if="item.status == 72" small color="teal darken-3" class="ml-2" @click="showCarryInEnter(item)">
                <v-icon left dark>rowing</v-icon>
                上架
              </v-btn>
              <v-btn v-if="item.status == 74" small color="success darken-1" class="ml-2" @click="showCarryInFinish(item)">
                <v-icon left dark>check</v-icon>
                确认
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- 出库任务确认组件 -->
    <stock-out-task-finish ref="stockOutTaskFinishMod" @close="loadStockOutTask"></stock-out-task-finish>

    <!-- 出库任务删除组件 -->
    <stock-out-task-delete ref="stockOutTaskDeleteMod" @close="stockOutShowDetails(info.stockOutId)"></stock-out-task-delete>

    <!-- 下发搬运出库任务组件 -->
    <carry-out-create ref="carryOutCreateMod" @close="loadCarryOutTask"></carry-out-create>

    <!-- 搬运出库信息组件 -->
    <carry-out-details ref="carryOutDetailsMod" @close="loadCarryOutTask"></carry-out-details>

    <!-- 搬运入库信息组件 -->
    <carry-in-details ref="carryInDetailsMod" @close="loadCarryInTask"></carry-in-details>

    <!-- 搬运出库确认组件 -->
    <carry-out-finish ref="carryOutFinishMod" @close="loadCarryOutTask"></carry-out-finish>

    <!-- 搬运入库确认组件 -->
    <carry-in-finish ref="carryInFinishMod" @close="loadCarryInTask"></carry-in-finish>

    <!-- 搬运入库上架组件 -->
    <carry-in-enter ref="carryInEnterMod" @close="loadCarryInTask"></carry-in-enter>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import carryOut from '@/controllers/carryOut'
import carryIn from '@/controllers/carryIn'
import StockOutTaskFinish from './Dialog/FinishTask'
import StockOutTaskDelete from './Dialog/DeleteTask'
import CarryOutCreate from '@/components/Dialog/CarryOutCreate'
import CarryOutDetails from '@/components/Dialog/CarryOutDetails'
import CarryOutFinish from '@/components/Dialog/CarryOutFinish'
import CarryInDetails from '@/components/Dialog/CarryInDetails'
import CarryInFinish from '@/components/Dialog/CarryInFinish'
import CarryInEnter from '@/components/Dialog/CarryInEnter'

export default {
  name: 'StockOutTaskDetails',
  props: {},
  components: {
    StockOutTaskFinish,
    StockOutTaskDelete,
    CarryOutCreate,
    CarryOutDetails,
    CarryInDetails,
    CarryInFinish,
    CarryOutFinish,
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
      info: state => state.stockOut.stockOutTaskInfo,
      refreshEvent: state => state.stockOut.refreshEvent
    })
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
      setTaskInfo: 'stockOut/setTaskInfo'
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

    // 显示出库任务确认
    showFinishTask() {
      this.$refs.stockOutTaskFinishMod.init(this.info.id)
    },

    // 显示删除出库任务
    showDeleteTask() {
      this.$refs.stockOutTaskDeleteMod.init(this.info.id)
    },

    // 下发搬运任务
    showCarryOutCreate() {
      this.$refs.carryOutCreateMod.init(this.info.id)
    },

    // 查看搬运出库任务
    viewCarryOutDetails(item) {
      this.$refs.carryOutDetailsMod.init(item.id)
    },

    // 确认搬运出库任务
    showCarryOutFinish(item) {
      this.$refs.carryOutFinishMod.init(item.id)
    },

    // 查看搬运入库任务
    viewCarryInDetails(item) {
      this.$refs.carryInDetailsMod.init(item.id)
    },

    // 显示搬运入库上架
    showCarryInEnter(item) {
      this.$refs.carryInEnterMod.init(item.trayCode)
    },

    // 确认搬运入库
    showCarryInFinish(item) {
      this.$refs.carryInFinishMod.init(item.id)
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
    }
  },
  mounted: function() {
    this.loadCarryOutTask()
    this.loadCarryInTask()
  }
}
</script>
