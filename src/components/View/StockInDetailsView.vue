<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayDate(info.inTime)" label="入库时间" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.monthTime" label="入库月份" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.flowNumber" label="流水单号" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.stockInType(info.type)" label="入库类型" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.customerNumber" label="客户编号" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.customerName" label="客户名称" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.contractNumber" label="合同编号" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.contractName" label="合同名称" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.contractType(info.contractType)" label="合同类型" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.billingType(info.billingType)" label="计费方式" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field
          v-model="info.unitPrice"
          label="冷藏费单价"
          :suffix="$util.billingTypeUnit(info.billingType)"
          hide-details
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.vehicleNumber" label="车牌号" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field v-model="info.userName" label="登记人" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayDateTime(info.confirmTime)" label="确认时间" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="3" xl="2" md="3" sm="6">
        <v-text-field :value="$util.displayStatus(info.status)" label="状态" hide-details readonly></v-text-field>
      </v-col>
      <v-col cols="6" xl="2" md="6" sm="6">
        <v-text-field label="备注" :value="info.remark" hide-details readonly> </v-text-field>
      </v-col>
      <v-col cols="6" xl="4" md="6" sm="6"> </v-col>
    </v-row>

    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'StockInDetailsView',
  props: {
    info: {
      type: Object,
      required: true
    }
  }
}
</script>
