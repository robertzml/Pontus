<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-1">出库单信息</v-expansion-panel-header>
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
              <v-btn color="success darken-1" v-if="info.status == 81" @click.stop="showFinish">确认出库单</v-btn>
              <v-btn color="warning" v-if="stockOutId && info.status != 85" @click.stop="showEdit">编辑出库单</v-btn>
              <v-btn color="red darken-3" v-if="stockOutId && info.status != 85" @click.stop="showDelete">删除出库单</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple class="deep-purple darken-3">出库货物</v-expansion-panel-header>
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

    <!-- 删除出库单组件 -->
    <stock-out-finish ref="stockOutFinishMod" @close="loadInfo"></stock-out-finish>

    <!-- 添加出库任务组件 -->
    <stock-out-task-create ref="createTaskMod" @close="loadTaskList"></stock-out-task-create>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import StockOutEdit from './Dialog/Edit'
import StockOutDelete from './Dialog/Delete'
import StockOutFinish from './Dialog/Finish'
import StockOutTaskCreate from '@/components/Dialog/StockOutTaskCreate'

export default {
  name: 'StockOutDetails',
  components: {
    StockOutEdit,
    StockOutDelete,
    StockOutFinish,
    StockOutTaskCreate
  },
  data: () => ({
    panel: [0, 1],
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '类别名称', value: 'categoryName' },
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
    })
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

    // 完成编辑出库任务
    updateTask() {
      this.loadTaskList()
    },

    // 查看入库任务
    viewTaskItem(val) {
      this.setTaskInfo(val)
      this.showTaskDetails()
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
    }
  },
  mounted: function() {
    this.loadInfo()
    this.loadTaskList()
  }
}
</script>
