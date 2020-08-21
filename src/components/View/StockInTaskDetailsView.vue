<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayDate(taskInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.flowNumber" label="入库单流水号" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.stockInType(taskInfo.stockInType)" label="入库类型" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.taskCode" label="入库任务码" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.inCount" label="入库数量" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.inWeight" label="总重量" suffix="吨" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="`${taskInfo.categoryNumber} - ${taskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.specification" label="规格" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.batch" label="批次" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.originPlace" label="产地" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="taskInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6" v-if="taskInfo.stockInType == 1">
        <v-text-field v-model="taskInfo.warehouseName" label="所在仓库" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6" v-if="taskInfo.stockInType == 1">
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
  name: 'StockInTaskDetailsView',
  props: {
    taskInfo: {
      type: Object,
      required: true
    }
  }
}
</script>
