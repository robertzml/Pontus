<template>
  <v-row dense no-gutters>
    <v-col cols="12">
      <v-toolbar dense flat>
        <v-toolbar-title>单据管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn text @click.stop="toList">返回</v-btn>
        <v-btn text @click.stop="refresh">刷新</v-btn>

        <template v-slot:extension>
          <v-tabs v-model="tab" grow slider-color="yellow">
            <v-tab>入库单据</v-tab>
            <v-tab>出库单据</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <receipt-stock-in></receipt-stock-in>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ReceiptStockIn from './StockIn'

export default {
  name: 'ReceiptIndex',
  components: {
    ReceiptStockIn
  },
  data: () => ({
    tab: null
  }),
  computed: {
    ...mapState({
      stockInTab: state => state.receipt.stockInTab
    })
  },
  methods: {
    ...mapActions({
      showStockInList: 'receipt/showStockInList'
    }),
    ...mapMutations({
      refresh: 'receipt/refresh'
    }),

    toList() {
      this.showStockInList()
    }
  },
  mounted: function() {}
}
</script>
