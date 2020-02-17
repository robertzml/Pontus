<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel>
      <v-expansion-panel-header ripple class="cyan darken-1">库存信息</v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <v-card>
          <v-row dense>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="`${storeInfo.categoryNumber} - ${storeInfo.categoryName}`" label="类别" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.trayCode" label="托盘码" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.specification" label="规格" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.batch" label="批次" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.originPlace" label="产地" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.totalCount" label="货品总数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.storeCount" label="在库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.totalWeight" label="货品总重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.shelfCode" label="上货货架码" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="$util.displayDate(storeInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="$util.displayStatus(storeInfo.status)" label="状态" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.remark" label="备注" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header ripple class="cyan darken-3">冷藏费</v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <v-card>
          <v-row dense>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="$util.displayDate(coldFeeInfo.startDate)" label="起始日期" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="$util.displayDate(coldFeeInfo.endDate)" label="结束日期" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="coldFeeInfo.days" label="天数" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="coldFeeInfo.unitPrice" label="单价" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="coldFeeInfo.count" label="数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="coldFeeInfo.amount" suffix="元" label="费用" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="$util.displayStatus(coldFeeInfo.status)" label="状态" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/controllers/store'
import coldFee from '@/controllers/coldFee'

export default {
  name: 'StoreDetails',
  data: () => ({
    panel: [0, 1],
    storeInfo: {},
    coldFeeInfo: {}
  }),
  computed: {
    ...mapState({
      storeId: state => state.store.storeId,
      refreshEvent: state => state.store.refreshEvent
    })
  },
  watch: {
    refreshEvent: function() {
      this.loadStore()
      this.loadColdFee()
    }
  },
  methods: {
    async loadStore() {
      this.storeInfo = await store.get(this.storeId)
    },
    async loadColdFee() {
      const now = this.$moment().format('YYYY-MM-DD')
      this.coldFeeInfo = await coldFee.getByStore(this.storeId, now)
    }
  },
  activated: function() {
    this.loadStore()
    this.loadColdFee()
  }
}
</script>
