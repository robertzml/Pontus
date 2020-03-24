<template>
  <v-card class="mx-auto">
    <v-list shaped>
      <v-subheader class="subtitle-1 teal--text text--lighten-2">出库单列表</v-subheader>
      <v-list-item-group v-model="model" color="primary" mandatory>
        <v-list-item v-for="item in stockOutList" :key="item.id" :value="item.id">
          <v-list-item-content>
            <v-list-item-title v-text="item.flowNumber" :class="{ 'orange--text': item.status != 85 }"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'

export default {
  name: 'StockOutMonth',
  data: () => ({
    stockOutList: [],
    model: ''
  }),
  watch: {
    monthTime: function() {
      this.loadStockOutList()
    },
    model: function(val) {
      this.showDetails(val)
    },
    refreshEvent: function() {
      this.loadStockOutList()
    }
  },
  computed: mapState({
    monthTime: state => state.stockOut.monthTime,
    refreshEvent: state => state.stockOut.refreshEvent
  }),
  methods: {
    ...mapActions({
      showDetails: 'stockOut/showDetails'
    }),

    // 载入入库单
    async loadStockOutList() {
      this.stockOutList = await stockOut.getListByMonth(this.monthTime)
    }
  },
  mounted: function() {
    this.loadStockOutList()
  }
}
</script>
