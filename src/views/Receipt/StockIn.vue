<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>入库单据</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="stockInTab == 'ReceiptStockInDetails'" text @click.stop="showStockInList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <keep-alive>
          <component v-bind:is="stockInTab"></component>
        </keep-alive>
      </v-slide-x-transition>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ReceiptStockInList from './StockInList'
import ReceiptStockInDetails from './StockInDetails'

export default {
  name: 'ReceiptStockIn',
  components: {
    ReceiptStockInList,
    ReceiptStockInDetails
  },
  data: () => ({}),
  computed: {
    ...mapState({
      stockInTab: (state) => state.receipt.stockInTab,
      refreshEvent: (state) => state.receipt.stockInRefreshEvent
    })
  },
  methods: {
    ...mapActions({
      showStockInList: 'receipt/showStockInList'
    }),

    ...mapMutations({
      refresh: 'receipt/refreshStockIn'
    })
  },
  mounted: function () {}
}
</script>
