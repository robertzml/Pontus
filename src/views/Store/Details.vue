<template>
  <v-card>
    <v-card-text>
      <div class="title text--primary">库存信息</div>

      <v-row dense>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.categoryNumber" label="类别编号" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.categoryName" label="类别名称" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.specification" label="规格" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.batch" label="批次" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.originPlace" label="产地" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.totalCount" label="货品总数量" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.storeCount" label="在库数量" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.totalWeight" label="货品总重量" suffix="吨" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.trayCode" label="托盘码" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field :value="$util.displayDate(storeInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field :value="$util.displayStatus(storeInfo.status)" label="状态" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="3" sm="4">
          <v-text-field v-model="storeInfo.remark" label="备注" hide-details readonly></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/controllers/store'

export default {
  name: 'StoreDetails',
  data: () => ({
    storeInfo: []
  }),
  computed: {
    ...mapState({
      storeId: state => state.store.storeId,
      refreshEvent: state => state.store.refreshEvent
    })
  },
  methods: {
    async loadStore() {
      this.storeInfo = await store.get(this.storeId)
    }
  },
  activated: function() {
    this.loadStore()
  }
}
</script>
