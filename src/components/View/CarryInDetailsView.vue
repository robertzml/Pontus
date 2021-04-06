<template>
  <v-row dense>
    <v-col :cols="col">
      <v-text-field label="任务码" v-model="carryInInfo.taskCode" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="搬运类型" :value="$util.carryInTaskType(carryInInfo.type)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="仓位码" v-model="carryInInfo.positionNumber" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="上货货架码" v-model="carryInInfo.shelfCode" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="托盘码" v-model="carryInInfo.trayCode" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="客户名称" v-model="carryInInfo.customerName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="合同名称" v-model="carryInInfo.contractName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="货品名称" v-model="carryInInfo.cargoName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="货品类别" :value="`${carryInInfo.categoryNumber} - ${carryInInfo.categoryName}`" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="搬运数量" v-model="carryInInfo.moveCount" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="搬运重量" v-model="carryInInfo.moveWeight" suffix="吨" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="规格" v-model="carryInInfo.specification" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="单位重量" v-model="carryInInfo.unitWeight" suffix="千克" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="库存入库时间" :value="$util.displayDate(carryInInfo.inTime)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="库存出库时间" :value="$util.displayDate(carryInInfo.outTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="清点人" v-model="carryInInfo.checkUserName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="清点时间" :value="$util.displayDateTime(carryInInfo.checkTime)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="接单人" v-model="carryInInfo.receiveUserName" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="接单时间" :value="$util.displayDateTime(carryInInfo.receiveTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="上架时间" :value="$util.displayDateTime(carryInInfo.moveTime)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="确认时间" :value="$util.displayDateTime(carryInInfo.finishTime)" hide-details readonly></v-text-field>
    </v-col>

    <v-col :cols="col">
      <v-text-field label="状态" :value="$util.displayStatus(carryInInfo.status)" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field label="备注" v-model="carryInInfo.remark" hide-details readonly></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CarryInDetailsView',
  props: {
    carryInInfo: {
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
