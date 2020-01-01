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
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import carryOut from '@/controllers/carryOut'
import CarryOutCreate from '../CarryOut/Create'
import CarryOutList from '../CarryOut/List'

export default {
  name: 'StockOutTaskDetails',
  props: {},
  components: {
    CarryOutCreate,
    CarryOutList
  },
  data: () => ({
    finishDialog: false,
    carryOutTaskList: [],
    carryInTaskInfo: {}
  }),
  computed: {
    ...mapState({
      info: state => state.stockOut.stockOutTaskInfo
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
  watch: {},
  methods: {
    ...mapMutations({
      setCarryOutDialog: 'stockOut/setCarryOutDialog'
    }),

    showCarryOut() {
      this.carryOutDialog = true
    },

    showFinish() {
      this.finishDialog = true
    },

    loadCarryOutTask() {
      let vm = this
      carryOut.listByStockOutTask(this.info.id).then(res => {
        vm.carryOutTaskList = res
      })
    },

    // 完成任务
    finishTask() {}
  },
  mounted: function() {
    this.loadCarryOutTask()
  }
}
</script>
