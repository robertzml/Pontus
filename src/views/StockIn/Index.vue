<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>货品入库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab != 'StockInDetails'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn text @click.stop="showCreate">新建入库单</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-menu v-model="inTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="inTime"
                prefix="入库时间"
                style="width:200px;"
                single-line
                hide-details
                solo
                flat
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="inTime" :day-format="$util.pickerDayFormat" @input="inTimeMenu = false"></v-date-picker>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="2">
      <stock-in-list ref="listMod"></stock-in-list>
    </v-col>

    <v-col cols="10">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <stock-in-create ref="stockInCreateMod" @close="closeCreate"></stock-in-create>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StockInList from './List'
import StockInCreate from './Create'
import StockInDetails from './Details'
import StockInTaskDetails from './TaskDetails'

export default {
  name: 'StockInIndex',
  components: {
    StockInList,
    StockInCreate,
    StockInDetails,
    StockInTaskDetails
  },
  data: () => ({
    inTimeMenu: false
  }),
  computed: {
    ...mapState({
      tab: state => state.stockIn.tab
    }),
    inTime: {
      get() {
        return this.$store.state.stockIn.inTime
      },
      set(val) {
        this.setInTime(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setId: 'stockIn/setId',
      setStockInInfo: 'stockIn/setStockInInfo',
      setInTime: 'stockIn/setInTime',
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

    //关闭添加入库
    closeCreate() {
      this.refresh()
    }
  }
}
</script>
