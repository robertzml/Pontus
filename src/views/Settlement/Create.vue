<template>
  <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="purple darken-2">
        添加结算信息
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">取消</v-btn>
      </v-card-title>
      <v-card-text>
        <v-card-subtitle class="pb-2 mt-1 light-green darken-4">用户信息</v-card-subtitle>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="3">
              <customer-select :customer-id.sync="settlementInfo.customerId"></customer-select>
            </v-col>
            <v-col cols="3">
              <v-menu v-model="startTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="settlementInfo.startTime" label="开始日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="settlementInfo.startTime" :day-format="$util.pickerDayFormat" @input="startTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="3">
              <v-menu v-model="endTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="settlementInfo.endTime" label="结束日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="settlementInfo.endTime" :day-format="$util.pickerDayFormat" @input="endTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="3">
              <v-btn color="cyan darken-4" class="mt-2" @click="startSettle">开始结算</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-text>
        <v-card-subtitle class="pb-2 cyan darken-3">费用清单</v-card-subtitle>
        <v-tabs v-model="tab" grow>
          <v-tab> 冷藏费用 </v-tab>
          <v-tab> 入库费用 </v-tab>
          <v-tab> 出库费用 </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-data-table :headers="coldFeeHeaders" :items="coldFeeData" :items-per-page="10" disable-sort>
              <template v-slot:[`item.startTime`]="{ item }">
                {{ item.startTime | displayDate }}
              </template>
              <template v-slot:[`item.endTime`]="{ item }">
                {{ item.endTime | displayDate }}
              </template>
            </v-data-table>
          </v-tab-item>

          <v-tab-item>
            <v-data-table :headers="inBillingHeaders" :items="inBillingData" :items-per-page="10" disable-sort>
              <template v-slot:[`item.inTime`]="{ item }">
                {{ item.inTime | displayDate }}
              </template>
              <template v-slot:[`item.unitPrice`]="{ item }">
                {{ item.type == 2 ? item.unitPrice : '' }}
              </template>
            </v-data-table>
          </v-tab-item>

          <v-tab-item>
            <v-data-table :headers="outBillingHeaders" :items="outBillingData" :items-per-page="10" disable-sort>
              <template v-slot:[`item.outTime`]="{ item }">
                {{ item.outTime | displayDate }}
              </template>
              <template v-slot:[`item.unitPrice`]="{ item }">
                {{ item.type == 2 ? item.unitPrice : '' }}
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-text>
        <v-card-subtitle class="pb-2 teal darken-4">结算信息</v-card-subtitle>
        <v-form ref="form2" v-model="valid2" lazy-validation>
          <v-row dense>
            <v-col cols="3">
              <v-text-field v-model="sumFee" label="费用合计" readonly suffix="元"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="settlementInfo.discount" label="折扣率" suffix="%"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="settlementInfo.remission" label="减免费用" suffix="元"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="dueFee" label="应付款" readonly suffix="元"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-menu v-model="settleTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="settlementInfo.settleTime" label="结算时间" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="settlementInfo.settleTime" :day-format="$util.pickerDayFormat" @input="settleTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field label="备注" v-model="settlementInfo.remark"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import settlement from '@/controllers/settlement'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'SettlementCreate',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: true,
    valid2: true,
    loading: false,
    dialog: false,
    startTimeMenu: false,
    endTimeMenu: false,
    settleTimeMenu: false,
    tab: null,
    settlementInfo: {
      customerId: 0,
      startTime: null,
      endTime: null,
      sumFee: 0.0,
      discount: 100.0,
      remission: 0.0,
      dueFee: 0,
      settleTime: null,
      userId: 0,
      userName: '',
      remark: ''
    },
    numberRules: [(v) => !!v || '请输入客户编号'],
    nameRules: [(v) => !!v || '请输入客户名称'],
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
    ],
    coldFeeData: [],
    coldFeeHeaders: [
      { text: '合同名称', value: 'contractName' },
      { text: '开始日期', value: 'startTime' },
      { text: '结束日期', value: 'endTime' },
      { text: '冷藏费单价(元/吨)', value: 'unitPrice' },
      { text: '冷藏费(元)', value: 'coldFee' }
    ]
  }),
  computed: {
    sumFee: function () {
      let total = 0.0
      this.inBillingData.forEach((item) => {
        total += item.amount
      })

      this.outBillingData.forEach((item) => {
        total += item.amount
      })

      this.coldFeeData.forEach((item) => {
        total += item.coldFee
      })

      return total.toFixed(3)
    },

    dueFee: function () {
      let fee = ((this.sumFee * this.settlementInfo.discount) / 100.0 - this.settlementInfo.remission).toFixed(3)
      return fee
    }
  },
  methods: {
    init() {
      this.settlementInfo = {
        customerId: 0,
        startTime: this.$moment().startOf('month').format('YYYY-MM-DD'),
        endTime: this.$moment().format('YYYY-MM-DD'),
        sumFee: 0.0,
        discount: 100.0,
        remission: 0.0,
        dueFee: 0,
        settleTime: this.$moment().format('YYYY-MM-DD'),
        userId: 0,
        userName: '',
        remark: ''
      }

      this.inBillingData = []
      this.outBillingData = []

      this.loading = false
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    // 开始结算
    async startSettle() {
      if (this.$refs.form.validate()) {
        const model = {
          customerId: this.settlementInfo.customerId,
          startTime: this.settlementInfo.startTime,
          endTime: this.settlementInfo.endTime
        }

        this.inBillingData = await settlement.getPeriodInBilling({ customerId: model.customerId, startTime: model.startTime, endTime: model.endTime })
        this.outBillingData = await settlement.getPeriodOutBilling({
          customerId: model.customerId,
          startTime: model.startTime,
          endTime: model.endTime
        })
        this.coldFeeData = await settlement.getPeriodColdFee({ customerId: model.customerId, startTime: model.startTime, endTime: model.endTime })
      }
    },

    submit() {
      if (this.$refs.form2.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        this.settlementInfo.sumFee = this.sumFee
        this.settlementInfo.userId = this.$store.state.user.id
        this.settlementInfo.userName = this.$store.state.user.name

        settlement
          .create(this.settlementInfo)
          .then((res) => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加结算记录成功')
              vm.$emit('close')
              vm.loading = false
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
          .catch(() => {
            vm.loading = false
          })
      }
    }
  }
}
</script>
