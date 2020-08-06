<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple">出库单信息</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <stock-out-details-view :info="info">
            <template v-slot:action>
              <v-btn color="indigo darken-3" v-if="info.status == 81" @click="showAddTask">添加货物</v-btn>
              <v-btn color="cyan darken-2" v-if="info.type == 2 && info.status == 81" @click="showScanTray">扫托盘码出库</v-btn>
              <v-btn color="success darken-1" v-if="info.status == 81" @click.stop="showFinish">确认出库单</v-btn>
              <v-btn color="warning" v-if="stockOutId && info.status != 85" @click.stop="showEdit">编辑出库单</v-btn>
              <v-btn color="red darken-3" v-if="stockOutId && info.status != 85" @click.stop="showDelete">删除出库单</v-btn>
              <v-btn color="purple darken-3" v-if="info.status == 81" @click="showBilling">设置出库费用</v-btn>
              <v-btn color="indigo darken-1" v-if="stockOutId && info.status == 81" @click.stop="setDiffCold">计算冷藏费差价</v-btn>
            </template>
          </stock-out-details-view>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-2">
          出库货物
          <v-spacer></v-spacer>
          <span class="text-subtitle-2">出库总数量: {{ totalCount }}</span>
          <span class="text-subtitle-2 ml-4">已确认数量: {{ finishCount }}</span>
          <span class="text-subtitle-2 ml-4">出库总重量: {{ totalWeight }} 吨</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="headers" :items="taskInfoList" hide-default-footer disable-pagination>
            <template v-slot:item.status="{ item }">
              <span :class="{ 'orange--text': item.status != 85 }">{{ item.status | displayStatus }}</span>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewTaskItem(item)">
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-4">
          出库费用
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 ml-4">费用合计: {{ totalFee }} 元</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="billingHeaders" :items="billingItems" hide-default-footer disable-pagination>
            <template v-slot:item.unitPrice="{ item }">
              {{ item.unitPrice == 0 ? '' : item.unitPrice }}
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- 设置出库费用组件 -->
    <stock-out-edit-billing ref="bllingMod" @close="loadBilling"></stock-out-edit-billing>

    <!-- 编辑出库单组件 -->
    <stock-out-edit ref="stockOutEditMod" @close="loadInfo"></stock-out-edit>

    <!-- 删除出库单组件 -->
    <stock-out-delete ref="stockOutDeleteMod" @close="refresh"></stock-out-delete>

    <!-- 确认出库单组件 -->
    <stock-out-finish ref="stockOutFinishMod" @close="loadInfo"></stock-out-finish>

    <!-- 添加出库任务组件 -->
    <stock-out-task-search ref="taskSearchMod" @close="loadTaskList"></stock-out-task-search>

    <!-- 添加普通库出库任务组件 -->
    <stock-out-task-normal ref="taskNormalMod" @close="loadTaskList"></stock-out-task-normal>

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
import StockOutEditBilling from './Dialog/EditBilling'
import StockOutDetailsView from '@/components/View/StockOutDetailsView'
import StockOutTaskSearch from '@/components/Dialog/StockOutTaskSearch'
import StockOutTaskNormal from '@/components/Dialog/StockOutTaskNormal'
import ScanTrayOut from '@/components/Dialog/ScanTrayOut'

export default {
  name: 'StockOutDetails',
  components: {
    StockOutDetailsView,
    StockOutEdit,
    StockOutDelete,
    StockOutFinish,
    StockOutEditBilling,
    StockOutTaskSearch,
    StockOutTaskNormal,
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
    taskInfoList: [],
    billingHeaders: [
      { text: '费用代码', value: 'code' },
      { text: '费用项目', value: 'name' },
      { text: '单价(吨/元)', value: 'unitPrice' },
      { text: '数量(吨)', value: 'count' },
      { text: '总价(元)', value: 'amount' }
    ],
    billingItems: []
  }),
  computed: {
    ...mapState({
      stockOutId: state => state.stockOut.stockOutId,
      info: state => state.stockOut.stockOutInfo,
      refreshEvent: state => state.stockOut.refreshEvent
    }),
    finishCount: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        if (item.status == 85) {
          total += item.outCount
        }
      })

      return total
    },
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
    },
    totalFee: function() {
      let total = 0
      this.billingItems.forEach(item => {
        total += item.amount
      })

      return total.toFixed(3)
    }
  },
  watch: {
    stockOutId: function() {
      this.loadInfo()
      this.loadTaskList()
      this.loadBilling()
    },
    refreshEvent: function() {
      this.loadInfo()
      this.loadTaskList()
      this.loadBilling()
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
        stockOut.find(this.stockOutId).then(res => {
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

    // 载入出库计费
    async loadBilling() {
      if (this.stockOutId) {
        this.billingItems = await stockOut.getBilling(this.stockOutId)
      } else {
        this.billingItems = []
      }
    },

    // 显示添加入库任务
    showAddTask() {
      if (this.stockOutId) {
        if (this.info.type == 1) {
          this.$refs.taskNormalMod.init(this.info)
        } else if (this.info.type == 2) {
          this.$refs.taskSearchMod.init(this.info)
        }
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

    // 显示出库计费
    showBilling() {
      this.$refs.bllingMod.init(this.stockOutId)
    },

    // 设置冷藏费差价
    setDiffCold() {
      let vm = this
      stockOut.setDiffCold({ stockOutId: this.stockOutId }).then(res => {
        if (res.status == 0) {
          vm.loadBilling()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    },

    // 查看出库任务
    viewTaskItem(val) {
      this.showTaskDetails(val)
    }
  },
  mounted: function() {
    this.loadInfo()
    this.loadTaskList()
    this.loadBilling()
  }
}
</script>
