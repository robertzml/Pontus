<template>
  <v-card class="mx-auto">
    <v-list shaped max-height="700" style="overflow-y:scroll;">
      <v-subheader class="subtitle-1 teal--text text--lighten-2">入库单列表</v-subheader>
      <v-list-item-group v-model="model" color="primary" mandatory>
        <v-list-item v-for="item in stockInList" :key="item.id" :value="item.id">
          <v-list-item-content>
            <v-list-item-title v-text="item.flowNumber"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInMonth',
  data: () => ({
    stockInList: [],
    model: ''
  }),
  watch: {
    monthTime: function() {
      this.loadStockInList()
    },
    model: function(val) {
      this.showDetails(val)
    },
    refreshEvent: function() {
      this.loadStockInList()
    }
  },
  computed: mapState({
    monthTime: state => state.stockIn.monthTime,
    refreshEvent: state => state.stockIn.refreshEvent
  }),
  methods: {
    ...mapActions({
      showDetails: 'stockIn/showDetails'
    }),

    // 载入入库单
    async loadStockInList() {
      this.stockInList = await stockIn.getListByMonth(this.monthTime)
    }
  },
  mounted: function() {
    this.loadStockInList()
  }
}
</script>
