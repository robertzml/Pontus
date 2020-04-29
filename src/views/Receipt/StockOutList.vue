<template>
  <v-row dense>
    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="3" md="3" sm="6">
              <customer-select :customer-id.sync="filter.customerId" :required="false"></customer-select>
            </v-col>

            <v-col cols="3" md="3" sm="6">
              <v-select :items="$dict.stockOutType" label="出库类型*" v-model="filter.stockOutType" clearable></v-select>
            </v-col>

            <v-col cols="3" md="3" sm="6">
              <v-menu v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="filter.time" label="出库日期" prepend-icon="event" clearable hide-details readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="filter.time" :day-format="$util.pickerDayFormat" @input="timeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3" md="3" sm="6">
              <v-text-field v-model="filter.text" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-title class="deep-purple">
          出库单
        </v-card-title>

        <v-data-table :headers="stockOutHeaders" :items="stockOutFilterData" :search="filter.text" :items-per-page="10">
          <template v-slot:item.outTime="{ item }">
            {{ item.outTime | displayDate }}
          </template>
          <template v-slot:item.type="{ item }">
            {{ $util.stockOutType(item.type) }}
          </template>
          <template v-slot:item.status="{ item }">
            {{ item.status | displayStatus }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn small color="primary" @click="viewItem(item)">
              <v-icon left dark>pageview</v-icon>
              查看
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'ReceiptStockOutList',
  components: {
    CustomerSelect
  },
  data: () => ({
    timeMenu: false,
    filter: {
      stockOutType: 0,
      customerId: 0,
      time: null,
      text: ''
    },
    stockOutListData: [],
    stockOutHeaders: [
      { text: '编号', value: 'flowNumber', align: 'left' },
      { text: '出库时间', value: 'outTime' },
      { text: '出库类型', value: 'type' },
      { text: '客户编号', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' },
      { text: '车牌号', value: 'vehicleNumber' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action' }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.receipt.stockInRefreshEvent
    }),
    // 过滤后出库单列表
    stockOutFilterData() {
      let temp = this.stockOutListData

      if (this.filter.customerId != 0) {
        temp = temp.filter(r => r.customerId == this.filter.customerId)
      }

      if (this.filter.stockOutType) {
        temp = temp.filter(r => r.type == this.filter.stockOutType)
      }

      if (this.filter.time) {
        let t = this.$moment(this.filter.time)
        temp = temp.filter(r => t.isSame(r.outTime))
      }

      return temp
    }
  },
  watch: {
    refreshEvent: function() {
      this.loadStockInList()
    }
  },
  methods: {
    ...mapActions({
      showStockOutDetails: 'receipt/showStockOutDetails'
    }),

    loadStockOutList() {
      let vm = this
      stockOut.getList().then(res => {
        vm.stockOutListData = res
      })
    },

    reset() {
      this.$refs.form.reset()
    },

    viewItem(item) {
      this.showStockOutDetails(item.id)
    }
  },
  mounted: function() {
    this.loadStockOutList()
  }
}
</script>
