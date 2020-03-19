<template>
  <v-sheet class="transparent">
    <v-toolbar dense class="sticky-toolbar">
      <v-toolbar-title>货品出库</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="tab != 'StockOutDetails'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
        <v-btn v-if="tab == 'StockOutDetails'" text @click.stop="showCreate">新建出库单</v-btn>
        <v-btn v-if="tab == 'StockOutDetails' && stockOutInfo.status == 85" text @click.stop="showRevert">撤回出库单</v-btn>
        <v-btn text @click.stop="refresh">刷新</v-btn>
        <v-menu v-model="outTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="monthTime"
              prefix="出库月份"
              style="width:180px;"
              single-line
              hide-details
              solo
              flat
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="monthTime" type="month" @input="outTimeMenu = false"></v-date-picker>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-row dense>
      <v-col cols="2">
        <stock-out-month></stock-out-month>
      </v-col>

      <v-col cols="10">
        <v-slide-x-transition leave-absolute>
          <component v-bind:is="tab"></component>
        </v-slide-x-transition>
      </v-col>

      <v-col cols="12">
        <!-- 新建出库组件 -->
        <stock-out-create ref="stockOutCreateMod" @close="refresh"></stock-out-create>

        <!-- 撤回出库组件 -->
        <stock-out-revert ref="stockOutRevertMod" @close="refresh"></stock-out-revert>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StockOutMonth from './Month'
import StockOutCreate from './Dialog/Create'
import StockOutRevert from './Dialog/Revert'
import StockOutDetails from './Details'
import StockOutTaskDetails from './TaskDetails'

export default {
  name: 'StockOutIndex',
  components: {
    StockOutMonth,
    StockOutCreate,
    StockOutRevert,
    StockOutDetails,
    StockOutTaskDetails
  },
  data: () => ({
    outTimeMenu: false
  }),
  computed: {
    ...mapState({
      tab: state => state.stockOut.tab,
      stockOutId: state => state.stockOut.stockOutId,
      stockOutInfo: state => state.stockOut.stockOutInfo
    }),
    monthTime: {
      get() {
        return this.$store.state.stockOut.monthTime
      },
      set(val) {
        this.setMonthTime(val)
      }
    }
  },
  methods: {
    ...mapActions({
      stockOutShowDetails: 'stockOut/showDetails'
    }),

    ...mapMutations({
      setStockOutId: 'stockOut/setStockOutId',
      setMonthTime: 'stockOut/setMonthTime',
      refresh: 'stockOut/refresh'
    }),

    // 返回出库单页面
    toList() {
      this.stockOutShowDetails(this.stockOutId)
    },

    // 显示货品出库
    showCreate() {
      this.$refs.stockOutCreateMod.init()
    },

    // 显示撤回出库单
    showRevert() {
      this.$refs.stockOutRevertMod.init(this.stockOutId)
    }
  }
}
</script>

<style scoped>
.sticky-toolbar {
  top: 48px;
  position: sticky;
  position: -webkit-sticky;
  z-index: 3;
}
</style>
