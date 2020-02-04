<template>
  <v-row dense>
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
import { mapState } from 'vuex'
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
      stockInTab: state => state.receipt.stockInTab,
      refreshEvent: state => state.receipt.refreshEvent
    })
  },
  watch: {
    refreshEvent: function() {}
  },
  methods: {},
  mounted: function() {}
}
</script>
