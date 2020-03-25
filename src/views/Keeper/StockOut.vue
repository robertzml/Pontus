<template>
  <v-sheet class="transparent">
    <v-row dense>
      <v-col cols="2">
        <v-list shaped class="brown darken-1">
          <v-subheader class="subtitle-1 teal--text text--lighten-2">
            待出库单据
            <v-spacer></v-spacer>
            <v-btn color="purple" small tile @click.stop="loadStockOutList">刷新</v-btn>
          </v-subheader>
          <v-list-item-group v-model="model" color="primary" mandatory>
            <v-list-item v-for="item in stockOutList" :key="item.id" :value="item.id">
              <v-list-item-content>
                <v-list-item-title v-text="item.flowNumber"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="10">
        <v-card class="px-2 teal darken-4">
          <v-subheader class="subtitle-1 teal--text text--lighten-2">出库单信息</v-subheader>
          <v-row dense>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field :value="$util.displayDate(stockOutInfo.outTime)" label="出库时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field v-model="stockOutInfo.flowNumber" label="流水单号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field :value="$util.stockOutType(stockOutInfo.type)" label="出库类型" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="6">
              <v-text-field label="车牌号" :value="stockOutInfo.vehicleNumber" hide-details readonly> </v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field v-model="stockOutInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field v-model="stockOutInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field v-model="stockOutInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field v-model="stockOutInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field :value="$util.contractType(stockOutInfo.contractType)" label="合同类型" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field :value="$util.billingType(stockOutInfo.billingType)" label="计费方式" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field
                v-model="stockOutInfo.unitPrice"
                label="冷藏费单价"
                :suffix="$util.billingTypeUnit(stockOutInfo.billingType)"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field v-model="stockOutInfo.userName" label="登记人" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field :value="$util.displayDateTime(stockOutInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" lg="2" md="3" sm="6">
              <v-text-field :value="$util.displayStatus(stockOutInfo.status)" label="状态" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="4" md="6" sm="6">
              <v-text-field label="备注" :value="stockOutInfo.remark" hide-details readonly> </v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn color="success darken-1" @click="refresh">刷新</v-btn>
            <v-btn color="primary darken-1" v-if="tab == 'StockOutTaskDetails'" @click="showStockOutTaskList">返回货物列表</v-btn>
            <v-btn color="indigo darken-3" v-if="stockOutInfo.status == 81 && tab == 'StockOutTaskList'" @click="showAddTask">添加货物</v-btn>
            <v-btn color="cyan darken-2" v-if="stockOutInfo.status == 81" @click="showScanTray">扫托盘码出库</v-btn>
          </v-card-actions>
        </v-card>

        <!-- 添加出库任务组件 -->
        <stock-out-task-search ref="taskSearchMod" @close="refresh"></stock-out-task-search>

        <!-- 添加普通库出库任务组件 -->
        <stock-out-task-normal ref="taskNormalMod" @close="refresh"></stock-out-task-normal>

        <!-- 扫托盘码出库组件 -->
        <scan-tray-out ref="scanMod" @close="refresh"></scan-tray-out>

        <v-slide-x-transition leave-absolute>
          <component v-bind:is="tab"></component>
        </v-slide-x-transition>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import stockOut from '@/controllers/stockOut'
import StockOutTaskList from './StockOutTaskList'
import StockOutTaskDetails from './StockOutTaskDetails'
import StockOutTaskSearch from '@/components/Dialog/StockOutTaskSearch'
import StockOutTaskNormal from '@/components/Dialog/StockOutTaskNormal'
import ScanTrayOut from '@/components/Dialog/ScanTrayOut'

export default {
  name: 'KeeperStockOut',
  components: {
    StockOutTaskList,
    StockOutTaskDetails,
    StockOutTaskSearch,
    StockOutTaskNormal,
    ScanTrayOut
  },
  data: () => ({
    stockOutList: [],
    model: '',
    stockOutInfo: {}
  }),
  watch: {
    model: function(val) {
      this.loadStockOutInfo()
      this.setStockOutId(val)
      this.setStockOutTaskId('')
      this.showStockOutTaskList()
    },
    refreshEvent: function() {
      this.loadStockOutInfo()
    }
  },
  computed: {
    ...mapState({
      tab: state => state.keeper.stockOutTab,
      refreshEvent: state => state.keeper.refreshEvent
    })
  },
  methods: {
    ...mapActions({
      showStockOutTaskList: 'keeper/showStockOutTaskList'
    }),

    ...mapMutations({
      setStockOutId: 'keeper/setStockOutId',
      setStockOutTaskId: 'keeper/setStockOutTaskId',
      refresh: 'keeper/refresh'
    }),

    // 载入出库单列表
    loadStockOutList() {
      let vm = this

      stockOut.getUnfinish().then(res => {
        vm.stockOutList = res
      })
    },

    // 载入出库单信息
    loadStockOutInfo() {
      if (this.model) {
        let vm = this
        stockOut.get(this.model).then(res => {
          vm.stockOutInfo = res
        })
      }
    },

    // 显示添加出库任务
    showAddTask() {
      if (this.model) {
        if (this.stockOutInfo.type == 1) {
          this.$refs.taskNormalMod.init(this.stockOutInfo)
        } else if (this.stockOutInfo.type == 2) {
          this.$refs.taskSearchMod.init(this.stockOutInfo)
        }
      }
    },

    // 显示扫托盘码出库
    showScanTray() {
      if (this.stockOutInfo) {
        this.$refs.scanMod.init(this.stockOutInfo.id)
      }
    }
  },
  mounted: function() {
    this.setStockOutId('')
    this.setStockOutTaskId('')
    this.loadStockOutList()
  }
}
</script>
