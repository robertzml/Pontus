<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>货品出库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab != 'StockOutDetails'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="tab == 'StockOutDetails'" text @click.stop="showCreate">新建出库单</v-btn>
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
    </v-col>

    <v-col cols="2">
      <stock-out-list ref="listMod"></stock-out-list>
    </v-col>

    <v-col cols="10">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <stock-out-create ref="stockOutCreateMod" @close="refresh"></stock-out-create>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StockOutList from './List'
import StockOutMonth from './Month'
import StockOutCreate from './Dialog/Create'
import StockOutDetails from './Details'
import StockOutTaskDetails from './TaskDetails'

export default {
  name: 'StockOutIndex',
  components: {
    StockOutList,
    StockOutMonth,
    StockOutCreate,
    StockOutDetails,
    StockOutTaskDetails
  },
  data: () => ({
    outTimeMenu: false
  }),
  computed: {
    ...mapState({
      tab: state => state.stockOut.tab
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
      this.stockOutShowDetails()
    },

    // 显示货品出库
    showCreate() {
      this.$refs.stockOutCreateMod.init()
    }
  }
}
</script>
