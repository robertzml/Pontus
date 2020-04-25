<template>
  <v-row dense>
    <v-col :cols="col">
      <v-text-field label="任务码" v-model="carryOutInfo.taskCode" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="搬运类型" :value="$util.carryOutTaskType(carryOutInfo.type)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="仓位码" v-model="carryOutInfo.positionNumber" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="下货货架码" v-model="carryOutInfo.shelfCode" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="托盘码" v-model="carryOutInfo.trayCode" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="客户名称" v-model="carryOutInfo.customerName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="合同名称" v-model="carryOutInfo.contractName" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="在库数量" v-model="carryOutInfo.storeCount" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="在库重量" v-model="carryOutInfo.storeWeight" suffix="吨" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="移出数量" v-model="carryOutInfo.moveCount" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="移出重量" v-model="carryOutInfo.moveWeight" suffix="吨" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="货品名称" v-model="carryOutInfo.cargoName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="货品类别" :value="`${carryOutInfo.categoryNumber} - ${carryOutInfo.categoryName}`" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="规格" v-model="carryOutInfo.specification" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="批次" v-model="carryOutInfo.batch" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="产地" v-model="carryOutInfo.originPlace" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="保质期" v-model="carryOutInfo.durability" suffix="月" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="库存入库时间" :value="$util.displayDate(carryOutInfo.inTime)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="库存出库时间" :value="$util.displayDate(carryOutInfo.outTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="接单人" v-model="carryOutInfo.receiveUserName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="接单时间" :value="$util.displayDateTime(carryOutInfo.receiveTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="下架时间" :value="$util.displayDateTime(carryOutInfo.moveTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="清点人" v-model="carryOutInfo.checkUserName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="清点时间" :value="$util.displayDateTime(carryOutInfo.checkTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="确认时间" :value="$util.displayDateTime(carryOutInfo.finishTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="状态" :value="$util.displayStatus(carryOutInfo.status)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="备注" v-model="carryOutInfo.remark" hide-details readonly></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CarryOutDetailsView',
  props: {
    carryOutInfo: {
      type: Object,
      required: true
    },
    col: {
      type: Number,
      default: 2
    }
  }
}
</script>
