<template>
  <v-row dense>
    <v-col cols="12" class="py-0">
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
                <v-text-field v-model="info.storeCount" label="在库数量" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.outCount" label="出库数量" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="info.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
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
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12">
      <carry-out-list :item-list="carryOutTaskList"></carry-out-list>
    </v-col>

    <v-col cols="12">
      <v-dialog v-model="carryOutDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <carry-out-create></carry-out-create>
      </v-dialog>

      <v-navigation-drawer v-model="drawer" fixed temporary right width="420">
        <carry-out-details></carry-out-details>
      </v-navigation-drawer>

      <v-dialog v-model="finishDialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">出库货物确认</v-card-title>
          <v-card-text>是否确认该货物已经出库完成？请确认所有搬运任务已经下架，确认后无法再下发任务。</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey lighten-3" text @click="finishDialog = false">取消</v-btn>
            <v-btn color="green darken-1" text @click="finishTask()">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import stockOut from '@/controllers/stockOut'
import carryOut from '@/controllers/carryOut'
import CarryOutCreate from '../CarryOut/Create'
import CarryOutList from '../CarryOut/List'
import CarryOutDetails from '../CarryOut/Details'

export default {
  name: 'StockOutTaskDetails',
  props: {},
  components: {
    CarryOutCreate,
    CarryOutList,
    CarryOutDetails
  },
  data: () => ({
    finishDialog: false,
    carryOutTaskList: []
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
    },
    drawer: {
      get() {
        return this.$store.state.stockOut.showTaskDrawer
      },
      set(val) {
        this.$store.state.stockOut.showTaskDrawer = val
      }
    }
  },
  watch: {
    refreshEvent: function() {
      this.loadStockOutTask()
      this.loadCarryOutTask()
    }
  },
  methods: {
    ...mapMutations({
      setTaskInfo: 'stockOut/setTaskInfo',
      setCarryOutDialog: 'stockOut/setCarryOutDialog'
    }),

    loadStockOutTask() {
      let vm = this
      stockOut.getTask(this.info.id).then(res => {
        vm.setTaskInfo(res)
      })
    },

    loadCarryOutTask() {
      let vm = this
      carryOut.listByStockOutTask(this.info.id).then(res => {
        vm.carryOutTaskList = res
      })
    },

    showCarryOut() {
      this.carryOutDialog = true
    },

    showFinish() {
      this.finishDialog = true
    },

    // 完成任务
    finishTask() {
      let vm = this

      stockOut.finishTask({ taskId: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '确认任务成功')
          vm.loadStockOutTask()
          vm.finishDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    }
  },
  mounted: function() {
    this.loadCarryOutTask()
  }
}
</script>
