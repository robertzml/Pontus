<template>
  <v-sheet class="transparent">
    <v-slide-x-transition leave-absolute>
      <keep-alive>
        <component v-bind:is="stockInCom"></component>
      </keep-alive>
    </v-slide-x-transition>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
import ReceiptStockInList from './StockInList'

export default {
  name: 'ReceiptStockIn',
  components: {
    ReceiptStockInList
  },
  data: () => ({
    stockInCom: 'ReceiptStockInList'
  }),
  computed: {
    ...mapState({
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
