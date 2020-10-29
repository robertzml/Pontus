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
                <customer-select :customer-id.sync="search.customerId" :required="false"></customer-select>
              </v-col>

              <v-col cols="3">
                <v-menu
                  v-model="startTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.startTime" label="开始日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.startTime" :day-format="$util.pickerDayFormat" @input="startTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  v-model="endTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.endTime" label="结束日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.endTime" :day-format="$util.pickerDayFormat" @input="endTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="searchCustomerFee">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          客户费用报表
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 mr-4">费用合计: {{ totalFee }} 元</span>
          <span class="text-subtitle-2 mr-4">期末合计: {{ totalEndDebt }} 元</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="customerFeeHeader" :items="customerFeeData" :items-per-page="10">
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
  name: 'StatisticCustomerFee',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: false,
    loading: false,
    startTimeMenu: false,
    endTimeMenu: false,
    search: {
      customerId: 0,
      startTime: null,
      endTime: null
    },
    customerFeeHeader: [
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '期初日期', value: 'startTime' },
      { text: '期末日期', value: 'endTime' },
      { text: '期初欠款(元)', value: 'startDebt' },
      { text: '基本费用(元)', value: 'baseFee' },
      { text: '冷藏费用(元)', value: 'coldFee' },
      { text: '其它费用(元)', value: 'miscFee' },
      { text: '费用合计(元)', value: 'totalFee' },
      { text: '回收款(元)', value: 'receiveFee' },
      { text: '折扣(元)', value: 'discount' },
      { text: '期末欠款(元)', value: 'endDebt' }
    ],
    customerFeeData: []
  }),
  computed: {
    // 费用合计
    totalFee: function() {
      let total = 0
      this.customerFeeData.forEach(r => {
        total = total + r.totalFee
      })

      return total.toFixed(3)
    },
    // 期末欠款合计
    totalEndDebt: function() {
      let total = 0
      this.customerFeeData.forEach(r => {
        total = total + r.endDebt
      })

      return total.toFixed(3)
    }
  },
  methods: {
    searchCustomerFee() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })
        let vm = this

        let model = {
          customerId: this.search.customerId,
          startTime: this.search.startTime,
          endTime: this.search.endTime
        }

        statistic.getCustomerFee(model).then(res => {
          vm.customerFeeData = res
          vm.loading = false
        })
      }
    }
  },
  mounted: function() {
    this.search.startTime = this.$moment()
      .startOf('month')
      .format('YYYY-MM-DD')
    this.search.endTime = this.$moment().format('YYYY-MM-DD')
  }
}
</script>
