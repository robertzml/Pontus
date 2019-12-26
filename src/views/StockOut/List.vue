<template>
  <v-card class="mx-auto">
    <v-list shaped>
      <v-subheader class="subtitle-1 teal--text text--lighten-2">出库单列表</v-subheader>
      <v-list-item-group v-model="model" color="primary">
        <v-list-item v-for="item in stockOutList" :key="item.id" :value="item.id">
          <v-list-item-content>
            <v-list-item-title v-text="item.flowNumber"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import stockOut from '@/controllers/stockOut'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'StockOutList',
  data: () => ({
    stockOutList: [],
    model: ''
  }),
  watch: {
    outTime: function() {
      this.loadStockOutList()
    },
    model: function(val) {
      this.setId(val)
    }
  },
  computed: mapState({
    outTime: state => state.stockOut.outTime,
    stockOutId: state => state.stockOut.stockOutId
  }),
  methods: {
    ...mapMutations({
      setId: 'stockOut/setStockOutId',
      setInfo: 'stockOut/setStockOutInfo'
    }),

    ...mapActions({
      stockOutShowDetails: 'stockOut/showDetails'
    }),

    loadStockOutList() {
      let vm = this

      stockOut.getListByTime(this.outTime).then(res => {
        vm.stockOutList = res
      })
    },

    // 更新列表
    update() {
      this.loadStockOutList()
    }
  },
  mounted: function() {
    this.loadStockOutList()
  }
}
</script>
