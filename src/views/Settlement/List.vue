<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="4">
                <customer-select :customer-id.sync="filter.customerId" :required="false"></customer-select>
              </v-col>

              <v-col cols="4">
                <v-menu v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="filter.time"
                      label="结算日期"
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

              <v-col cols="4">
                <v-text-field v-model="filter.text" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title class="orange">
            结算列表
            <v-spacer></v-spacer>
            <span class="subtitle-2 ml-4">结算总记录: {{ settlementFilterData.length }} 条</span>
            <span class="subtitle-2 ml-4">应付款总金额: {{ totalFee }} 元</span>
          </v-card-title>
          <v-card-text class="px-0">
            <v-data-table :headers="headers" :items="settlementFilterData" :search="filter.text" :items-per-page="10">
              <template v-slot:item.paidType="{ item }">
                {{ item.paidType | paidType }}
              </template>
              <template v-slot:item.startTime="{ item }">
                {{ item.startTime | displayDate }}
              </template>
              <template v-slot:item.endTime="{ item }">
                {{ item.endTime | displayDate }}
              </template>
              <template v-slot:item.settleTime="{ item }">
                {{ item.settleTime | displayDate }}
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn small color="success" @click="viewItem(item)">
                  <v-icon left dark>pageview</v-icon>
                  查看
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import settlement from '@/controllers/settlement'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'SettlementList',
  components: {
    CustomerSelect
  },
  data: () => ({
    timeMenu: false,
    filter: {
      customerId: 0,
      time: null,
      text: ''
    },
    settlementListData: [],
    headers: [
      { text: '结算单号', value: 'number', align: 'left' },
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '开始日期', value: 'startTime' },
      { text: '结束日期', value: 'endTime' },
      { text: '应付款(元)', value: 'dueFee' },
      { text: '结算时间', value: 'settleTime' },
      { text: '登记人', value: 'userName' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.settlement.refreshEvent
    }),
    // 过滤后结算列表
    settlementFilterData() {
      let temp = this.settlementListData

      if (this.filter.customerId != 0) {
        temp = temp.filter(r => r.customerId == this.filter.customerId)
      }

      if (this.filter.time) {
        let t = this.$moment(this.filter.time)
        temp = temp.filter(r => t.isSame(r.settleTime))
      }

      return temp
    },

    // 结算总金额
    totalFee: function() {
      return this.settlementFilterData
        .reduce(function(acc, cur) {
          return acc + cur.dueFee
        }, 0.0)
        .toFixed(3)
    }
  },
  watch: {
    refreshEvent: function() {
      this.loadList()
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'settlement/showDetails'
    }),

    async loadList() {
      this.settlementListData = await settlement.getList()
    },
    viewItem(item) {
      this.showDetails(item.id)
    }
  },
  activated: function() {
    this.loadList()
  }
}
</script>
