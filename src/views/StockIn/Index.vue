<template>
  <v-sheet class="transparent">
    <v-toolbar dense class="sticky-toolbar">
      <v-toolbar-title>货品入库</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="tab != 'StockInDetails'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
        <v-btn v-if="tab == 'StockInDetails'" text @click.stop="showCreate">新建入库单</v-btn>
        <v-btn v-if="tab == 'StockInDetails' && stockInInfo.status == 75" text @click.stop="showRevert">撤回入库单</v-btn>
        <v-btn text @click.stop="refresh">刷新</v-btn>
        <v-btn text @click.stop="print">打印</v-btn>
        <v-menu v-model="inTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="monthTime" prefix="入库月份" style="width: 180px" single-line hide-details solo flat readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="monthTime" type="month" @input="inTimeMenu = false"></v-date-picker>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-row dense>
      <v-col cols="2">
        <stock-in-month></stock-in-month>
      </v-col>

      <v-col cols="10">
        <v-slide-x-transition leave-absolute>
          <component v-bind:is="tab"></component>
        </v-slide-x-transition>
      </v-col>

      <v-col cols="12">
        <stock-in-create ref="stockInCreateMod" @close="refresh"></stock-in-create>
        <stock-in-revert ref="stockInRevertMod" @close="refresh"></stock-in-revert>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StockInMonth from './Month'
import StockInCreate from './Dialog/Create'
import StockInRevert from './Dialog/Revert'
import StockInDetails from './Details'
import StockInTaskDetails from './TaskDetails'

export default {
  name: 'StockInIndex',
  components: {
    StockInMonth,
    StockInCreate,
    StockInRevert,
    StockInDetails,
    StockInTaskDetails
  },
  data: () => ({
    inTimeMenu: false
  }),
  computed: {
    ...mapState({
      tab: (state) => state.stockIn.tab,
      stockInId: (state) => state.stockIn.stockInId,
      stockInInfo: (state) => state.stockIn.stockInInfo
    }),
    monthTime: {
      get() {
        return this.$store.state.stockIn.monthTime
      },
      set(val) {
        this.setMonthTime(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setId: 'stockIn/setId',
      setMonthTime: 'stockIn/setMonthTime',
      refresh: 'stockIn/refresh'
    }),

    ...mapActions({
      stockInShowDetails: 'stockIn/showDetails',
      stockInShowTaskDetails: 'stockIn/showTaskDetals'
    }),

    // 返回入库列表
    toList() {
      this.stockInShowDetails(this.stockInId)
    },

    // 显示创建入库单
    showCreate() {
      this.$refs.stockInCreateMod.init(0)
    },

    // 显示撤回入库单
    showRevert() {
      this.$refs.stockInRevertMod.init(this.stockInId)
    },

    // 打印入库单
    print() {
      if (this.stockInId) {
        let uid = this.$store.state.user.id
        let url = this.$util.reportUrl() + 'stockIn?id=' + this.stockInId + '&uid=' + uid

        window.open(url)
      }
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
