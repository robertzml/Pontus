<template>
  <v-row dense>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field :value="`${storeInfo.categoryNumber} - ${storeInfo.categoryName}`" label="类别" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.trayCode" label="托盘码" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.positionNumber" label="仓位码" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.specification" label="规格" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.batch" label="批次" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.originPlace" label="产地" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.storeCount" label="在库数量" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.shelfCode" label="上货货架码" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field :value="$util.displayDate(storeInfo.initialTime)" label="初始时间" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field :value="$util.displayDate(storeInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field :value="$util.displayDate(storeInfo.outTime)" label="出库时间" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field :value="$util.displayStatus(storeInfo.status)" label="状态" hide-details readonly></v-text-field>
    </v-col>
    <v-col :cols="col">
      <v-text-field v-model="storeInfo.remark" label="备注" hide-details readonly></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'StoreDetailsView',
  props: {
    storeInfo: {
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
