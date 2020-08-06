<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="primary">入库单信息 </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <stock-in-details-view :info="info">
            <template v-slot:action>
              <v-btn color="indigo darken-3" v-if="info.status == 71" @click="showAddTask">添加货物</v-btn>
              <v-btn color="purple darken-3" v-if="info.status == 71" @click="showBilling">设置入库费用</v-btn>
              <v-btn color="success darken-1" v-if="info.status == 71" @click.stop="showFinish">确认入库单</v-btn>
              <v-btn color="warning" v-if="stockInId && info.status != 75" @click.stop="showEdit">编辑入库单</v-btn>
              <v-btn color="red darken-3" v-if="stockInId && info.status != 75" @click.stop="showDelete">删除入库单</v-btn>
            </template>
          </stock-in-details-view>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="blue darken-2">
          入库货物
          <v-spacer></v-spacer>
          <span class="subtitle-2 ml-4">入库总数量: {{ totalCount }}</span>
          <span class="subtitle-2 ml-4">已确认数量: {{ finishCount }}</span>
          <span class="subtitle-2 ml-4">入库总重量: {{ totalWeight }} 吨</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-table :headers="headers" :items="taskInfoList" hide-default-footer disable-pagination>
            <template v-slot:item.status="{ item }">
              <span :class="{ 'orange--text': item.status != 75 }">{{ item.status | displayStatus }}</span>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary" @click="viewTaskItem(item)">
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="blue darken-4">
          入库费用
          <v-spacer></v-spacer>
          <span class="subtitle-2 ml-4">费用合计: {{ totalFee }} 元</span>
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

    <!-- 设置入库费用组件 -->
    <stock-in-edit-billing ref="bllingMod" @close="loadBilling"></stock-in-edit-billing>

    <!-- 编辑入库单组件 -->
    <stock-in-edit ref="stockInEditMod" @close="loadInfo"></stock-in-edit>

    <!-- 确认入库单组件 -->
    <stock-in-finish ref="stockInFinishMod" @close="loadInfo"></stock-in-finish>

    <!-- 删除入库单组件 -->
    <stock-in-delete ref="stockInDeleteMod" @close="refresh"></stock-in-delete>

    <!-- 添加入库任务组件 -->
    <stock-in-task-create ref="createTaskMod" @close="loadTaskList"></stock-in-task-create>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'
import StockInTaskCreate from '@/components/Dialog/StockInTaskCreate'
import StockInDetailsView from '@/components/View/StockInDetailsView'
import StockInEdit from './Dialog/Edit'
import StockInFinish from './Dialog/Finish'
import StockInDelete from './Dialog/Delete'
import StockInEditBilling from './Dialog/EditBilling'

export default {
  name: 'StockInDetails',
  components: {
    StockInDetailsView,
    StockInTaskCreate,
    StockInEdit,
    StockInFinish,
    StockInDelete,
    StockInEditBilling
  },
  data: () => ({
    panel: [0, 1, 2],
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '类别名称', value: 'categoryName' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'inWeight' },
      { text: '批次', value: 'batch' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
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
      // 传入入库单ID
      stockInId: state => state.stockIn.stockInId,
      info: state => state.stockIn.stockInInfo,
      refreshEvent: state => state.stockIn.refreshEvent
    }),
    finishCount: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        if (item.status == 75) {
          total += item.inCount
        }
      })

      return total
    },
    totalCount: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        total += item.inCount
      })

      return total
    },
    totalWeight: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        total += item.inWeight
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
    stockInId: function() {
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
      setStockInInfo: 'stockIn/setStockInInfo',
      setTaskInfo: 'stockIn/setTaskInfo',
      refresh: 'stockIn/refresh'
    }),
    ...mapActions({
      showTaskDetails: 'stockIn/showTaskDetals'
    }),

    // 载入入库单信息
    loadInfo() {
      if (this.stockInId) {
        let vm = this
        stockIn.find(this.stockInId).then(res => {
          vm.setStockInInfo(res)
        })
      } else {
        this.setStockInInfo({})
      }
    },

    // 载入入库任务列表
    async loadTaskList() {
      if (this.stockInId) {
        this.taskInfoList = await stockIn.getTaskList(this.stockInId)
      } else {
        this.taskInfoList = []
      }
    },

    // 载入入库计费
    async loadBilling() {
      if (this.stockInId) {
        this.billingItems = await stockIn.getBilling(this.stockInId)
      } else {
        this.billingItems = []
      }
    },

    // 查看入库任务
    viewTaskItem(val) {
      this.showTaskDetails(val)
    },

    // 显示添加入库任务
    showAddTask() {
      if (this.stockInId) {
        this.$refs.createTaskMod.init(this.info)
      }
    },

    // 显示计费
    showBilling() {
      this.$refs.bllingMod.init(this.stockInId)
    },

    // 显示编辑入库单
    showEdit() {
      this.$refs.stockInEditMod.init(this.stockInId)
    },

    // 显示确认入库单
    showFinish() {
      this.$refs.stockInFinishMod.init(this.stockInId)
    },

    // 显示删除入库单
    showDelete() {
      this.$refs.stockInDeleteMod.init(this.stockInId)
    }
  },
  mounted: function() {
    this.loadInfo()
    this.loadTaskList()
    this.loadBilling()
  }
}
</script>
