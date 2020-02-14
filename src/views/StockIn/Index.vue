<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>货品入库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab != 'StockInDetails'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="tab == 'StockInDetails'" text @click.stop="showCreate">新建入库单</v-btn>
          <v-btn v-if="tab == 'StockInDetails' && stockInInfo.status == 75" text @click.stop="revertDialog = true">撤回入库单</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-menu v-model="inTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="monthTime"
                prefix="入库月份"
                style="width:180px;"
                single-line
                hide-details
                solo
                flat
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="monthTime" type="month" @input="inTimeMenu = false"></v-date-picker>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

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
    </v-col>

    <v-dialog v-model="revertDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">撤回入库单</v-card-title>
        <v-card-text>是否确认撤回该入库单？ <br />流水单号: {{ stockInInfo.flowNumber }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="revertDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="revertLoading" @click="revert">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import stockIn from '@/controllers/stockIn'
import StockInMonth from './Month'
import StockInList from './List'
import StockInCreate from './Create'
import StockInDetails from './Details'
import StockInTaskDetails from './TaskDetails'

export default {
  name: 'StockInIndex',
  components: {
    StockInMonth,
    StockInList,
    StockInCreate,
    StockInDetails,
    StockInTaskDetails
  },
  data: () => ({
    inTimeMenu: false,
    revertDialog: false,
    revertLoading: false
  }),
  computed: {
    ...mapState({
      tab: state => state.stockIn.tab,
      stockInInfo: state => state.stockIn.stockInInfo
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
      setStockInInfo: 'stockIn/setStockInInfo',
      setInTime: 'stockIn/setInTime',
      setMonthTime: 'stockIn/setMonthTime',
      refresh: 'stockIn/refresh'
    }),

    ...mapActions({
      stockInShowDetails: 'stockIn/showDetails',
      stockInShowTaskDetails: 'stockIn/showTaskDetals'
    }),

    // 返回入库列表
    toList() {
      this.stockInShowDetails()
    },

    // 显示货品入库
    showCreate() {
      this.$refs.stockInCreateMod.init(0)
    },

    // 撤回入库单
    revert() {
      let vm = this
      this.$nextTick(() => {
        this.revertLoading = true
      })

      stockIn.revert({ id: this.stockInInfo.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库单已撤回')
          vm.refresh()
          vm.revertLoading = false
          vm.revertDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.revertLoading = false
        }
      })
    }
  }
}
</script>
