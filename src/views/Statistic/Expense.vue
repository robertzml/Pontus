<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>费用项目报表</v-toolbar-title>
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

              <v-col cols="3">
                <v-select
                  :items="contractListData"
                  label="选择合同*"
                  :rules="contractRules"
                  :hint="`${search.selectedContract.number}`"
                  item-text="name"
                  item-value="id"
                  v-model="search.selectedContract"
                  persistent-hint
                  return-object
                ></v-select>
              </v-col>

              <v-col cols="3">
                <v-menu v-model="startTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.startTime" label="开始日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.startTime" :day-format="$util.pickerDayFormat" @input="startTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu v-model="endTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.endTime" label="结束日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.endTime" :day-format="$util.pickerDayFormat" @input="endTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="2">
                <v-text-field label="合同类型" :value="$util.contractType(search.selectedContract.type)" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-text-field label="计费方式" :value="$util.billingType(search.selectedContract.billingType)" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-text-field
                  label="冷藏费单价"
                  v-model="search.selectedContract.unitPrice"
                  :suffix="$util.billingTypeUnit(search.selectedContract.billingType)"
                  hide-details
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-text-field label="最短天数" v-model="search.selectedContract.parameter1" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="searchExpense">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          费用列表
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 mr-4">费用合计: {{ totalFee }} 元</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="expenseData" hide-default-footer disable-pagination>
            <template v-slot:[`item.type`]="{ item }">
              {{ item.type | expenseItemType }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="blue darken-2">
          入库费用列表
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 mr-4">入库总费用: {{ totalInBilling }} 元</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="inBillingHeaders" :items="inBillingData" :items-per-page="10" disable-sort>
            <template v-slot:[`item.inTime`]="{ item }">
              {{ item.inTime | displayDate }}
            </template>
            <template v-slot:[`item.unitPrice`]="{ item }">
              {{ item.type == 2 ? item.unitPrice : '' }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="teal darken-3">
          出库费用列表
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 mr-4">出库总费用: {{ totalOutBilling }} 元</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="outBillingHeaders" :items="outBillingData" :items-per-page="10" disable-sort>
            <template v-slot:[`item.outTime`]="{ item }">
              {{ item.outTime | displayDate }}
            </template>
            <template v-slot:[`item.unitPrice`]="{ item }">
              {{ item.type == 2 ? item.unitPrice : '' }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import contract from '@/controllers/contract'
import statistic from '@/controllers/statistic'
import expense from '@/controllers/expense'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StatisticExpense',
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
      selectedContract: { number: '' },
      startTime: null,
      endTime: null
    },
    contractListData: [],
    contractRules: [(v) => !!v.id || '请选择合同'],
    headers: [
      { text: '费用代码', value: 'code' },
      { text: '费用项目', value: 'name' },
      { text: '计费方式', value: 'type' },
      { text: '费用(元)', value: 'amount' }
    ],
    expenseData: [],
    inBillingData: [],
    inBillingHeaders: [
      { text: '日期', value: 'inTime' },
      { text: '流水单', value: 'flowNumber' },
      { text: '费用代码', value: 'code' },
      { text: '费用名称', value: 'name' },
      { text: '单价', value: 'unitPrice' },
      { text: '数量(吨)', value: 'count' },
      { text: '费用(元)', value: 'amount' }
    ],
    outBillingData: [],
    outBillingHeaders: [
      { text: '日期', value: 'outTime' },
      { text: '流水单', value: 'flowNumber' },
      { text: '费用代码', value: 'code' },
      { text: '费用名称', value: 'name' },
      { text: '单价', value: 'unitPrice' },
      { text: '数量(吨)', value: 'count' },
      { text: '费用(元)', value: 'amount' }
    ]
  }),
  watch: {
    'search.customerId': function (val) {
      this.loadContract(val)
    }
  },
  computed: {
    totalFee: function () {
      let total = 0
      this.expenseData.forEach((item) => {
        total = total + item.amount
      })

      return total.toFixed(3)
    },

    totalInBilling: function () {
      return this.inBillingData
        .reduce(function (acc, cur) {
          return acc + cur.amount
        }, 0.0)
        .toFixed(3)
    },

    totalOutBilling: function () {
      return this.outBillingData
        .reduce(function (acc, cur) {
          return acc + cur.amount
        }, 0.0)
        .toFixed(3)
    }
  },
  methods: {
    // 载入合同
    async loadContract(customerId) {
      if (customerId) {
        this.contractListData = await contract.getList(customerId)
        if (this.contractListData.length > 0) {
          this.search.selectedContract = this.contractListData[0]
        }
      } else {
        this.contractListData = []
      }
    },

    async searchExpense() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })
        let vm = this

        let model = {
          customerId: this.search.customerId,
          contractId: this.search.selectedContract.id,
          startTime: this.search.startTime,
          endTime: this.search.endTime
        }
        statistic.getExpenseRecord(model).then((res) => {
          if (res.status == 0) {
            vm.expenseData = res.entity
            vm.loading = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.loading = false
          }
        })

        this.inBillingData = await expense.getPeriodInBilling({ contractId: model.contractId, startTime: model.startTime, endTime: model.endTime })
        this.outBillingData = await expense.getPeriodOutBilling({ contractId: model.contractId, startTime: model.startTime, endTime: model.endTime })
      }
    }
  },
  mounted: function () {
    this.search.startTime = this.$moment().startOf('month').format('YYYY-MM-DD')
    this.search.endTime = this.$moment().format('YYYY-MM-DD')
  }
}
</script>
