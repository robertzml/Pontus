<template>
  <v-sheet class="transparent">
    <v-row dense>
      <v-col cols="2">
        <v-list shaped class="brown darken-1">
          <v-subheader class="subtitle-1 teal--text text--lighten-2">
            待入库单据
            <v-spacer></v-spacer>
            <v-btn color="purple" small tile @click.stop="loadStockInList">刷新</v-btn>
          </v-subheader>
          <v-list-item-group v-model="model" color="primary" mandatory>
            <v-list-item v-for="item in stockInList" :key="item.id" :value="item.id">
              <v-list-item-content>
                <v-list-item-title v-text="item.flowNumber"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="10">
        <v-card class="px-2 blue-grey darken-3">
          <v-subheader class="subtitle-1 teal--text text--lighten-2">入库单信息</v-subheader>
          <v-row dense>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayDate(stockInInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="stockInInfo.flowNumber" label="流水单号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.stockInType(stockInInfo.type)" label="入库类型" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="stockInInfo.vehicleNumber" label="车牌号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="stockInInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="stockInInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="stockInInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="stockInInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.contractType(stockInInfo.contractType)" label="合同类型" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.billingType(stockInInfo.billingType)" label="计费方式" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field
                v-model="stockInInfo.unitPrice"
                label="冷藏费单价"
                :suffix="$util.billingTypeUnit(stockInInfo.billingType)"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="stockInInfo.userName" label="登记人" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayDateTime(stockInInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayStatus(stockInInfo.status)" label="状态" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" :value="stockInInfo.remark" hide-details readonly> </v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn color="success darken-1" @click="refresh">刷新</v-btn>
            <v-btn color="primary darken-1" v-if="tab == 'StockInTaskDetails'" @click="showStockInTaskList">返回货物列表</v-btn>
            <v-btn color="cyan darken-1" v-if="stockInInfo.status == 71 && tab == 'StockInTaskList'" @click="showAddTask">添加货物</v-btn>
          </v-card-actions>
        </v-card>

        <stock-in-create-task v-if="stockInInfo" ref="createTaskMod" :stockInInfo="stockInInfo" @update="refresh"></stock-in-create-task>

        <v-slide-x-transition leave-absolute>
          <component v-bind:is="tab"></component>
        </v-slide-x-transition>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import stockIn from '@/controllers/stockIn'
import StockInTaskList from './StockInTaskList'
import StockInTaskDetails from './StockInTaskDetails'
import StockInCreateTask from '@/components/Dialog/StockInCreateTask'

export default {
  name: 'KeeperStockIn',
  components: {
    StockInTaskList,
    StockInTaskDetails,
    StockInCreateTask
  },
  data: () => ({
    stockInList: [],
    model: '',
    stockInInfo: {}
  }),
  watch: {
    model: function(val) {
      this.loadStockInInfo()
      this.setStockInId(val)
      this.setStockInTaskId('')
      this.showStockInTaskList()
    },
    refreshEvent: function() {
      this.loadStockInInfo()
    }
  },
  computed: {
    ...mapState({
      tab: state => state.keeper.stockInTab,
      refreshEvent: state => state.keeper.refreshEvent
    })
  },
  methods: {
    ...mapActions({
      showStockInTaskList: 'keeper/showStockInTaskList'
    }),

    ...mapMutations({
      setStockInId: 'keeper/setStockInId',
      setStockInTaskId: 'keeper/setStockInTaskId',
      refresh: 'keeper/refresh'
    }),

    // 载入入库单列表
    loadStockInList() {
      let vm = this

      stockIn.getUnfinish().then(res => {
        vm.stockInList = res
      })
    },

    // 载入入库单信息
    loadStockInInfo() {
      if (this.model) {
        let vm = this
        stockIn.get(this.model).then(res => {
          vm.stockInInfo = res
        })
      }
    },

    // 显示添加入库任务
    showAddTask() {
      if (this.model) {
        this.$refs.createTaskMod.init()
      }
    }
  },
  mounted: function() {
    this.setStockInId('')
    this.setStockInTaskId('')
    this.loadStockInList()
  }
}
</script>
