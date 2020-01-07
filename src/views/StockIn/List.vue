<template>
  <v-card class="mx-auto">
    <v-list shaped>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInList',
  data: () => ({
    stockInList: [],
    model: ''
  }),
  watch: {
    inTime: function() {
      this.loadStockInList()
    },
    model: function(val) {
      this.setId(val)
      this.showDetails()
    },
    refreshEvent: function() {
      this.loadStockInList()
    }
  },
  computed: mapState({
    inTime: state => state.stockIn.inTime,
    stockInId: state => state.stockIn.stockInId,
    refreshEvent: state => state.stockIn.refreshEvent
  }),
  methods: {
    ...mapMutations({
      setId: 'stockIn/setStockInId'
    }),

    ...mapActions({
      showDetails: 'stockIn/showDetails'
    }),

    loadStockInList() {
      let vm = this

      stockIn.getListByTime(this.inTime).then(res => {
        vm.stockInList = res
      })
    },

    // 更新列表
    update() {
      this.loadStockInList()
    }
  },
  mounted: function() {
    this.loadStockInList()
  }
}
</script>
