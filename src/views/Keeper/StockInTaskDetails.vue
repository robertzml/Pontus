<template>
  <v-row dense>
    <v-col cols="5">
      <v-card class="mb-2">
        <v-subheader class="subtitle-1 orange--text text--lighten-2">入库货物信息</v-subheader>

        <v-card-text>
          <v-row dense>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.inCount" label="入库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.inWeight" label="总重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="`${taskInfo.categoryNumber} - ${taskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.specification" label="规格" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.batch" label="批次" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.originPlace" label="产地" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.userName" label="创建人" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="$util.displayDateTime(taskInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="$util.displayDateTime(taskInfo.finishTime)" label="完成时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field :value="$util.displayStatus(taskInfo.status)" label="状态" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3" md="4" sm="6">
              <v-text-field v-model="taskInfo.remark" label="备注" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" v-if="this.taskInfo.status == 71" @click.stop="showAddCarryIn">任务下发</v-btn>
          <v-btn color="error" v-if="this.taskInfo.status != 75" @click.stop="deleteDialog = true">删除入库货物</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="7">
      <v-card class="mb-2">
        <v-subheader class="subtitle-1 purple--text text--lighten-2">搬运入库任务</v-subheader>
        <v-card-text class="px-0">
          <v-data-table :headers="carryInTaskHeaders" :items="carryInTaskList" hide-default-footer disable-filtering disable-pagination>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn v-if="item.status == 72" small color="red darken-3" class="ml-2" @click="deleteCarryIn(item)">
                <v-icon left dark>delete</v-icon>
                删除
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-dialog v-model="deleteDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">删除入库货物</v-card-title>
        <v-card-text>是否确认删除该入库货物？仅能删除未下发搬运任务的入库货物。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="deleteDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="deleteLoading" @click="deleteTask">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <carry-in-create ref="carryInMod" :stockInTask="taskInfo" @update="loadCarryInList"></carry-in-create>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'
import CarryInCreate from '@/components/Dialog/CarryInCreate'

export default {
  name: 'StockInTaskDetails',
  components: {
    CarryInCreate
  },
  data: () => ({
    deleteDialog: false,
    deleteLoading: false,
    taskInfo: {},
    carryInTaskList: [],
    carryInTaskHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  watch: {
    refreshEvent: function() {
      this.loadStockInTask()
      this.loadCarryInList()
    }
  },
  computed: {
    ...mapState({
      // 传入入库任务ID
      stockInTaskId: state => state.keeper.stockInTaskId,
      refreshEvent: state => state.keeper.refreshEvent
    })
  },
  methods: {
    ...mapActions({
      showStockInTaskList: 'keeper/showStockInTaskList'
    }),

    // 载入入库任务
    loadStockInTask() {
      let vm = this
      stockIn.getTask(this.stockInTaskId).then(res => {
        vm.taskInfo = res
      })
    },

    // 载入搬运入库任务
    loadCarryInList() {
      let vm = this
      carryIn.listByStockInTask(this.stockInTaskId).then(res => {
        vm.carryInTaskList = res
      })
    },

    // 删除入库任务
    deleteTask() {
      let vm = this
      this.$nextTick(() => {
        this.deleteLoading = true
      })

      stockIn.deleteTask({ taskId: this.taskInfo.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除任务成功')
          vm.showStockInTaskList()
          vm.deleteLoading = false
          vm.deleteDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.deleteLoading = false
        }
      })
    },

    // 下发任务
    showAddCarryIn() {
      this.$refs.carryInMod.init()
    },

    // 删除搬运入库
    deleteCarryIn(item) {
      if (confirm('是否删除该搬运任务')) {
        let vm = this
        carryIn.delete({ id: item.id }).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '删除搬运入库任务成功')
            vm.loadCarryInList()
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    }
  },
  mounted: function() {
    this.loadStockInTask()
    this.loadCarryInList()
  }
}
</script>
