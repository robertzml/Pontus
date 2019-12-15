<template>
  <v-sheet>
    <v-card flat class="mx-auto">
      <v-card-title class="cyan">
        入库任务信息
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-row dense>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayDate(info.inTime)" label="入库时间" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.flowNumber" label="入库单流水号" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.stockInType(info.type)" label="入库类型" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.taskCode" label="入库任务码" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.cargoName" label="货品名称" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.inCount" label="入库数量" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.unitWeight" label="单位重量" suffix="千克" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.inWeight" label="总重量" suffix="吨" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="`${info.categoryNumber} - ${info.categoryName}`" label="货品类别" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.specification" label="规格" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.originPlace" label="产地" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.durability" label="保质期" suffix="月" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="info.userName" label="创建人" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayDateTime(info.finishTime)" label="完成时间" readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field v-model="info.remark" label="备注" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" v-if="this.info.status == 71" @click.stop="setCarryIn">任务下发</v-btn>
        <v-btn color="indigo" v-if="this.info.status == 74" @click.stop="showFinish">入库确认</v-btn>
      </v-card-actions>
    </v-card>

    <carry-in-list :item-list="carryInTaskList"></carry-in-list>
    <stock-in-finish-task ref="finishMod"></stock-in-finish-task>
    <carry-in-create ref="carryInMod" :stock-in-task="info" @update="loadCarryInTask"></carry-in-create>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'
import CarryInCreate from '../CarryIn/Create'
import CarryInList from '../CarryIn/List'
import StockInFinishTask from './FinishTask'

export default {
  name: 'StockInTaskDetails',
  props: {},
  components: {
    CarryInCreate,
    CarryInList,
    StockInFinishTask
  },
  data: () => ({
    taskId: '',
    carryInTaskList: []
  }),
  computed: mapState({
    info: state => state.stockIn.stockInTaskInfo,
    window: state => state.stockIn.stockInWindow
  }),
  watch: {
    window: function(val) {
      if (val == 'taskDetails') {
        console.log('task details show')
        this.loadCarryInTask()
      }
    }
  },
  methods: {
    getInfo() {
      let vm = this
      stockIn.getTask(this.taskId).then(res => {
        vm.info = res
      })
    },

    loadCarryInTask() {
      let vm = this
      carryIn.listByStockInTask(this.info.id).then(res => {
        vm.carryInTaskList = res
      })
    },

    setCarryIn() {
      this.$refs.carryInMod.show()
    },

    showFinish() {
      this.$refs.finishMod.init(this.info.customerNumber, this.taskId)
    }
  },
  mounted: function() {}
}
</script>
