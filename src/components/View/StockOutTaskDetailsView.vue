<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayDate(taskInfo.outTime)" label="出库时间" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.flowNumber" label="出库单流水号" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.stockOutType(taskInfo.stockOutType)" label="出库类型" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.taskCode" label="出库任务码" hide-details readonly></v-text-field>
      </v-col>

      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="`${taskInfo.categoryNumber} - ${taskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.specification" label="规格" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
      </v-col>

      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.storeCount" label="在库数量" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.outCount" label="出库数量" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.outWeight" label="出库重量" suffix="吨" hide-details readonly></v-text-field>
      </v-col>

      <v-col cols="3" xl="2" md="3" sm="6" v-if="taskInfo.stockOutType == 1">
        <v-text-field v-model="taskInfo.warehouseName" label="所在仓库" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6" v-if="taskInfo.stockOutType == 1">
        <v-text-field v-model="taskInfo.place" label="存放位置" hide-details readonly></v-text-field>
      </v-col>

      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.userName" label="创建人" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayDateTime(taskInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayDateTime(taskInfo.finishTime)" label="完成时间" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayStatus(taskInfo.status)" label="状态" hide-details readonly></v-text-field>
      </v-col>

      <v-col cols="6" xl="4" md="6" sm="6">
        <v-text-field v-model="taskInfo.remark" label="备注" hide-details readonly></v-text-field>
      </v-col>
    </v-row>

    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'StockOutTaskDetailsView',
  props: {
    taskInfo: {
      type: Object,
      required: true
    }
  }
}
</script>
