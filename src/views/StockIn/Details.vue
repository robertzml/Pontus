<template>
  <v-sheet class="transparent">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header ripple>入库单信息</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-card flat class="mx-auto">
            <v-form>
              <v-row dense>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDate(info.inTime)" label="入库时间" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.monthTime" label="入库月份" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.flowNumber" label="流水单号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.stockInType(info.type)" label="入库类型" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.customerNumber" label="客户编号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.customerName" label="客户名称" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.contractNumber" label="合同编号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.contractName" label="合同名称" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.contractType(info.contractType)" label="合同类型" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.billingType(info.billingType)" label="计费方式" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.unitPrice" label="冷藏费单价" :suffix="$util.billingTypeUnit(info.billingType)" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.vehicleNumber" label="车牌号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.userName" label="登记人" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayDateTime(info.confirmTime)" label="确认时间" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <v-text-field label="备注" :value="info.remark" readonly> </v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <vue-barcode v-if="stockInId != 0" v-bind:value="info.flowNumber" :height="50" :font-size="10"></vue-barcode>
                </v-col>
              </v-row>
            </v-form>

            <v-card-actions>
              <v-btn color="primary darken-1" v-if="info.status == 71" @click="showAddTask">添加货物</v-btn>
              <v-btn color="deep-orange darken-3" v-if="info.status == 71" @click.stop="showFinish">入库单确认</v-btn>
              <v-btn color="red darken-3" v-if="stockInId && info.status != 75" @click.stop="showDelete">删除入库单</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header ripple>入库货物</v-expansion-panel-header>
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

    <stock-in-edit-task ref="editTaskMod" @update="updateTask"></stock-in-edit-task>

    <v-dialog v-model="finishDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">入库单确认</v-card-title>
        <v-card-text>是否确认该入库单已经入库完成？请确认所有入库货物已经上架，确认后无法再增加货物。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="finishDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text @click="finish">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">删除入库单</v-card-title>
        <v-card-text>是否确认删除该入库单？仅能删除无入库货物的入库单。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="deleteDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text @click="deleteStockIn">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'
import StockInEditTask from './EditTask'
import VueBarcode from 'vue-barcode'

export default {
  name: 'StockInDetails',
  components: {
    StockInEditTask,
    VueBarcode
  },
  data: () => ({
    panel: [0, 1],
    finishDialog: false,
    deleteDialog: false,
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
    taskInfoList: []
  }),
  computed: mapState({
    stockInId: state => state.stockIn.stockInId,
    info: state => state.stockIn.stockInInfo,
    refreshEvent: state => state.stockIn.refreshEvent
  }),
  watch: {
    stockInId: function() {
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
        stockIn.get(this.stockInId).then(res => {
          vm.setStockInInfo(res)
        })
      } else {
        this.setStockInInfo({})
      }
    },

    // 载入入库任务列表
    loadTaskList() {
      if (this.stockInId) {
        let vm = this
        stockIn.getTaskList(this.stockInId).then(res => {
          vm.taskInfoList = res
        })
      } else {
        this.taskInfoList = []
      }
    },

    // 显示添加入库任务
    showAddTask() {
      if (this.stockInId) {
        this.$refs.editTaskMod.init()
      }
    },

    // 完成编辑入库任务
    updateTask() {
      this.loadTaskList()
    },

    // 查看入库任务
    viewTaskItem(val) {
      this.setTaskInfo(val)
      this.showTaskDetails()
    },

    showFinish() {
      this.finishDialog = true
    },

    // 确认入库单完成
    finish() {
      let vm = this

      stockIn.confirm({ id: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库单已确认')
          vm.loadInfo()
          vm.finishDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    },

    showDelete() {
      this.deleteDialog = true
    },

    // 删除入库单
    deleteStockIn() {
      let vm = this

      stockIn.deleteStockIn({ id: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库单已删除')
          vm.refresh()
          vm.deleteDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    }
  },
  mounted: function() {
    this.loadInfo()
    this.loadTaskList()
  }
}
</script>
