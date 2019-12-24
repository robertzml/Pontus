<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>货品出库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab != 'StockOutDetails'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn text @click.stop="showCreate">货品出库</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="3">
      <stock-out-tree-list ref="listMod"></stock-out-tree-list>
    </v-col>

    <v-col cols="9">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <stock-out-create ref="stockOutCreateMod" @close="closeCreate"></stock-out-create>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StockOutTreeList from './TreeList'
import StockOutCreate from './Create'
import StockOutDetails from './Details'
import StockOutEditTask from './EditTask'

export default {
  name: 'StockOutIndex',
  components: {
    StockOutTreeList,
    StockOutCreate,
    StockOutDetails,
    StockOutEditTask
  },
  computed: mapState({
    tab: state => state.stockOut.tab
  }),
  data: () => ({}),
  methods: {
    ...mapActions({
      stockOutShowDetails: 'stockOut/showDetails'
    }),

    ...mapMutations({ setStockOutId: 'stockOut/setStockOutId' }),

    // 进入货品出库
    showCreate() {
      this.$refs.stockOutCreateMod.init()
    },

    toList() {
      this.stockOutShowDetails()
    },

    refresh() {},

    /**
     * 关闭添加出库
     * val: 出库id
     * update: 是否新增
     *  */
    closeCreate(val, update) {
      if (update) {
        this.$refs.listMod.init()
      }

      this.setStockOutId(val)
      this.stockOutShowDetails()
    }
  }
}
</script>
