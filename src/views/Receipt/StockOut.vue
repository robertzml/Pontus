<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>出库单据</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'ReceiptStockOutDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <keep-alive>
          <component v-bind:is="tab"></component>
        </keep-alive>
      </v-slide-x-transition>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ReceiptStockOutList from './StockOutList'
import ReceiptStockOutDetails from './StockOutDetails'

export default {
  name: 'ReceiptStockOut',
  components: {
    ReceiptStockOutList,
    ReceiptStockOutDetails
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: (state) => state.receipt.stockOutTab,
      refreshEvent: (state) => state.receipt.stockOutRefreshEvent
    })
  },
  methods: {
    ...mapActions({
      showList: 'receipt/showStockOutList'
    }),

    ...mapMutations({
      refresh: 'receipt/refreshStockOut'
    })
  }
}
</script>
