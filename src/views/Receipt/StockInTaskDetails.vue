<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card flat>
      <v-card-title class="blue darken-3">
        入库货物信息
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDate(taskInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.flowNumber" label="入库单流水号" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.stockInType(taskInfo.stockInType)" label="入库类型" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.taskCode" label="入库任务码" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.inCount" label="入库数量" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.inWeight" label="总重量" suffix="吨" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="`${taskInfo.categoryNumber} - ${taskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.specification" label="规格" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.batch" label="批次" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.originPlace" label="产地" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="taskInfo.userName" label="创建人" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDateTime(taskInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDateTime(taskInfo.finishTime)" label="完成时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayStatus(taskInfo.status)" label="状态" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field v-model="taskInfo.remark" label="备注" hide-details readonly></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="dialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'ReceiptStockInTaskDetails',
  data: () => ({
    dialog: false,
    taskInfo: {}
  }),
  methods: {
    init(id) {
      let vm = this
      stockIn.getTask(id).then(res => {
        vm.taskInfo = res
      })
      this.dialog = true
    }
  }
}
</script>
