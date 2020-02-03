<template>
  <v-row dense>
    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle>
          筛选
        </v-card-subtitle>
        <v-card-text>
          <form>
            <v-row dense>
              <v-col cols="4" md="4" sm="4">
                <customer-select :customer-id.sync="filter.customerId" :required="false"></customer-select>
              </v-col>

              <v-col cols="4" md="4" sm="4">
                <v-menu v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="filter.time"
                      label="出入库日期"
                      prepend-icon="event"
                      clearable
                      hide-details
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filter.time" :day-format="$util.pickerDayFormat" @input="timeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="4" md="4" sm="4">
                <v-text-field v-model="filter.text" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
              </v-col>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-title class="light-blue lighten-2">
          入库单
        </v-card-title>

        <v-data-table :headers="stockInHeaders" :items="stockInFilterData" :search="filter.text" :items-per-page="10">
          <template v-slot:item.inTime="{ item }">
            {{ item.inTime | displayDate }}
          </template>
          <template v-slot:item.type="{ item }">
            {{ $util.stockInType(item.type) }}
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
import { mapState } from 'vuex'
import stockIn from '@/controllers/stockIn'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'ReceiptStockInList',
  components: {
    CustomerSelect
  },
  data: () => ({
    tab: null,
    valid: false,
    searchLoading: false,
    timeMenu: false,
    filter: {
      customerId: 0,
      time: null,
      text: ''
    },
    stockInListData: [],
    stockInHeaders: [
      { text: '编号', value: 'flowNumber', align: 'left' },
      { text: '入库时间', value: 'inTime' },
      { text: '入库类型', value: 'type' },
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
      refreshEvent: state => state.receipt.refreshEvent
    }),
    stockInFilterData() {
      let temp = this.stockInListData

      if (this.filter.customerId != 0) {
        temp = temp.filter(r => r.customerId == this.filter.customerId)
      }

      if (this.filter.time) {
        let t = this.$moment(this.filter.time)
        temp = temp.filter(r => t.isSame(r.inTime))
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
    loadStockInList() {
      let vm = this
      stockIn.getList().then(res => {
        vm.stockInListData = res
      })
    },

    reset() {
      this.$refs.form.reset()
    }
  },
  mounted: function() {
    this.loadStockInList()
  }
}
</script>
