<template>
  <v-card class="mx-auto">
    <v-card-title class="cyan"> 仓位信息 </v-card-title>
    <v-card-text class="pb-1">
      <v-form>
        <v-container class="px-1">
          <v-row dense>
            <v-col cols="3">
              <v-text-field v-model="positionInfo.number" label="主编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="positionInfo.viceNumber" label="副编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field v-model="positionInfo.row" label="排" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field v-model="positionInfo.layer" label="层" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field v-model="positionInfo.depth" label="进" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field :value="$util.displayStatus(positionInfo.status)" label="状态" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text class="pb-1" v-for="item in storeList" :key="item.id">
      <div class="title text--primary">库存信息</div>
      <v-form>
        <v-container class="px-1">
          <v-row dense>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.customerNumber" label="客户编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.customerName" label="客户名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.contractNumber" label="合同编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.contractName" label="合同名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.cargoName" label="货品名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.categoryNumber" label="类别编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.categoryName" label="类别名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.specification" label="规格" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.batch" label="批次" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.originPlace" label="产地" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.storeCount" label="在库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.trayCode" label="托盘码" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field :value="$util.displayDate(item.initialTime)" label="初始时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field :value="$util.displayDate(item.inTime)" label="入库时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field :value="$util.displayStatus(item.status)" label="状态" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="4">
              <v-text-field v-model="item.remark" label="备注" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StorePositionInfo',
  props: {
    positionInfo: {
      type: Object
    },
    storeList: {
      type: Array
    }
  },
  data: () => ({})
}
</script>
