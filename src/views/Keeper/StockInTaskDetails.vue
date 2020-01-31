<template>
  <v-row dense>
    <v-col cols="5">
      <v-card class="mb-2">
        <v-subheader class="subtitle-1 orange--text text--lighten-2">入库货物信息</v-subheader>

        <v-card-text>
          <v-form>
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
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" v-if="this.taskInfo.status == 71" @click.stop="createCarryIn">任务下发</v-btn>
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
              <v-btn small color="success" @click="viewCarryInDetails(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
              <v-btn v-if="item.status == 72" small color="red darken-3" class="ml-2" @click="deleteCarryIn(item)">
                <v-icon left dark>delete</v-icon>
                删除
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import stockIn from '@/controllers/stockIn'
import carryIn from '@/controllers/carryIn'

export default {
  name: 'StockInTaskDetails',
  data: () => ({
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
  computed: {
    ...mapState({
      stockInTaskId: state => state.keeper.stockInTaskId
    })
  },
  methods: {
    loadStockInTask() {
      let vm = this
      stockIn.getTask(this.stockInTaskId).then(res => {
        vm.taskInfo = res
      })
    },

    loadCarryInList() {
      let vm = this
      carryIn.listByStockInTask(this.stockInTaskId).then(res => {
        vm.carryInTaskList = res
      })
    }
  },
  mounted: function() {
    this.loadStockInTask()
    this.loadCarryInList()
  }
}
</script>
