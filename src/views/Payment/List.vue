<template>
  <v-row dense>
    <v-col cols="12">
      <v-card>
        <v-card-title class="orange">
          缴费列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="paymentListData" :search="search" :items-per-page="10">
            <template v-slot:item.paidType="{ item }">
              {{ item.paidType | paidType }}
            </template>
            <template v-slot:item.paidTime="{ item }">
              {{ item.paidTime | displayDate }}
            </template>
            <template v-slot:item.createTime="{ item }">
              {{ item.createTime | displayDateTime }}
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
</template>

<script>
import { mapState } from 'vuex'
import payment from '@/controllers/payment'

export default {
  name: 'PaymentList',
  data: () => ({
    search: '',
    paymentListData: [],
    headers: [
      { text: '票号', value: 'ticketNumber', align: 'left' },
      { text: '客户名称', value: 'customerName' },
      { text: '客户代码', value: 'customerNumber' },
      { text: '缴费金额(元)', value: 'paidFee' },
      { text: '缴费日期', value: 'paidTime' },
      { text: '缴费方式', value: 'paidType' },
      { text: '登记人', value: 'userName' },
      { text: '登记时间', value: 'createTime' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: mapState({
    refreshEvent: state => state.payment.refreshEvent
  }),
  watch: {
    refreshEvent: function() {
      this.loadList()
    }
  },
  methods: {
    async loadList() {
      this.paymentListData = await payment.getList()
    },
    viewItem(item) {
      console.log(item)
    }
  },
  mounted: function() {
    this.loadList()
  }
}
</script>
