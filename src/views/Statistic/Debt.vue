<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>客户欠款</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items> </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="3">
                <customer-select :customer-id.sync="search.customerId" :required="true"></customer-select>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="searchDebt">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          实时欠款列表
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="debtHeader" :items="debtData" :items-per-page="10">
            <template v-slot:item.startTime="{ item }">
              {{ item.startTime | displayDate }}
            </template>
            <template v-slot:item.endTime="{ item }">
              {{ item.endTime | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import statistic from '@/controllers/statistic'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StatisticDebt',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: false,
    loading: false,
    startTimeMenu: false,
    endTimeMenu: false,
    search: {
      customerId: 0
    },
    debtHeader: [
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '开始日期', value: 'startTime' },
      { text: '结束日期', value: 'endTime' },
      { text: '已结算费用(元)', value: 'settleFee' },
      { text: '未结算费用(元)', value: 'unSettleFee' },
      { text: '费用合计(元)', value: 'sumFee' },
      { text: '实付款(元)', value: 'paidFee' },
      { text: '欠费(元)', value: 'debtFee' }
    ],
    debtData: []
  }),
  methods: {
    searchDebt() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })
        let vm = this

        statistic.getDebt(this.search.customerId).then(res => {
          vm.debtData = [res]
          vm.loading = false
        })
      }
    }
  },
  mounted: function() {}
}
</script>
