<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple">出库单信息</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-card flat class="mx-auto">
            <v-row dense>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDate(info.outTime)" label="出库时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.monthTime" label="出库月份" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.flowNumber" label="流水单号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.stockOutType(info.type)" label="出库类型" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.customerNumber" label="客户编号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.customerName" label="客户名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.contractNumber" label="合同编号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.contractName" label="合同名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.contractType(info.contractType)" label="合同类型" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.billingType(info.billingType)" label="计费方式" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field
                  v-model="info.unitPrice"
                  label="冷藏费单价"
                  :suffix="$util.billingTypeUnit(info.billingType)"
                  hide-details
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="3" sm="6">
                <v-text-field label="车牌号" :value="info.vehicleNumber" hide-details readonly> </v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.userName" label="登记人" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(info.confirmTime)" label="确认时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayStatus(info.status)" label="状态" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field label="备注" :value="info.remark" hide-details readonly> </v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn color="indigo darken-3" v-if="info.status == 81" @click="showAddTask">添加货物</v-btn>
              <v-btn color="cyan darken-2" v-if="info.status == 81" @click="showScanTray">扫托盘码出库</v-btn>
              <v-btn color="success darken-1" v-if="info.status == 81" @click.stop="showFinish">确认出库单</v-btn>
              <v-btn color="warning" v-if="stockOutId && info.status != 85" @click.stop="showEdit">编辑出库单</v-btn>
              <v-btn color="red darken-3" v-if="stockOutId && info.status != 85" @click.stop="showDelete">删除出库单</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-2">
          出库货物
          <v-spacer></v-spacer>
          <span class="subtitle-2">出库总数量: {{ totalCount }}</span>
          <span class="subtitle-2 ml-4">出库总重量: {{ totalWeight }} 吨</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="headers" :items="taskInfoList" hide-default-footer disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewTaskItem(item)">
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- 编辑出库单组件 -->
    <stock-out-edit ref="stockOutEditMod" @close="loadInfo"></stock-out-edit>

    <!-- 删除出库单组件 -->
    <stock-out-delete ref="stockOutDeleteMod" @close="refresh"></stock-out-delete>

    <!-- 确认出库单组件 -->
    <stock-out-finish ref="stockOutFinishMod" @close="loadInfo"></stock-out-finish>

    <!-- 添加出库任务组件 -->
    <stock-out-task-create ref="createTaskMod" @close="loadTaskList"></stock-out-task-create>

    <!-- 扫托盘码出库组件 -->
    <scan-tray-out ref="scanMod" @close="loadTaskList"></scan-tray-out>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import StockOutEdit from './Dialog/Edit'
import StockOutDelete from './Dialog/Delete'
import StockOutFinish from './Dialog/Finish'
import StockOutTaskCreate from '@/components/Dialog/StockOutTaskCreate'
import ScanTrayOut from '@/components/Dialog/ScanTrayOut'

export default {
  name: 'StockOutDetails',
  components: {
    StockOutEdit,
    StockOutDelete,
    StockOutFinish,
    StockOutTaskCreate,
    ScanTrayOut
  },
  data: () => ({
    panel: [0, 1],
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
    taskInfoList: []
  }),
  computed: {
    ...mapState({
      stockOutId: state => state.stockOut.stockOutId,
      info: state => state.stockOut.stockOutInfo,
      refreshEvent: state => state.stockOut.refreshEvent
    }),
    totalCount: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        total += item.outCount
      })

      return total
    },
    totalWeight: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        total += item.outWeight
      })

      return total.toFixed(4)
    }
  },
  watch: {
    stockOutId: function() {
      this.loadInfo()
      this.loadTaskList()
    },
    refreshEvent: function() {
      this.loadInfo()
      this.loadTaskList()
    }
  },
  methods: {
    ...mapMutations({
      setStockOutInfo: 'stockOut/setStockOutInfo',
      setTaskInfo: 'stockOut/setTaskInfo',
      refresh: 'stockOut/refresh'
    }),
    ...mapActions({
      showTaskDetails: 'stockOut/showTaskDetals'
    }),

    // 载入出库单信息
    loadInfo() {
      if (this.stockOutId) {
        let vm = this
        stockOut.get(this.stockOutId).then(res => {
          vm.setStockOutInfo(res)
        })
      } else {
        this.setStockOutInfo({})
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

    // 显示添加入库任务
    showAddTask() {
      if (this.stockOutId) {
        this.$refs.createTaskMod.init(this.info)
      }
    },

    // 显示扫托盘码出库
    showScanTray() {
      this.$refs.scanMod.init(this.stockOutId)
    },

    // 显示编辑入库单
    showEdit() {
      this.$refs.stockOutEditMod.init(this.stockOutId)
    },

    // 显示删除出库单
    showDelete() {
      this.$refs.stockOutDeleteMod.init(this.stockOutId)
    },

    // 显示确认出库单
    showFinish() {
      this.$refs.stockOutFinishMod.init(this.stockOutId)
    },

    // 查看入库任务
    viewTaskItem(val) {
      this.showTaskDetails(val)
    }
  },
  mounted: function() {
    this.loadInfo()
    this.loadTaskList()
  }
}
</script>
