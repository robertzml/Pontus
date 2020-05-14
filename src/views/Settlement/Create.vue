<template>
  <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="purple darken-2">
        添加结算信息
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">取消</v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="3">
              <customer-select :customer-id.sync="settlementInfo.customerId"></customer-select>
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
                  <v-text-field v-model="settlementInfo.startTime" label="开始日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="settlementInfo.startTime" :day-format="$util.pickerDayFormat" @input="startTimeMenu = false"></v-date-picker>
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
                  <v-text-field v-model="settlementInfo.endTime" label="结束日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="settlementInfo.endTime" :day-format="$util.pickerDayFormat" @input="endTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="3">
              <v-btn color="cyan darken-4" class="mt-2" @click="startSettle">开始结算</v-btn>
            </v-col>

            <v-col cols="6" md="6" sm="6">
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
    loading: false,
    dialog: false,
    startTimeMenu: false,
    endTimeMenu: false,
    settlementInfo: {
      customerId: 0,
      startTime: null,
      endTime: null,
      discount: 0.0,
      remission: 0.0,
      dueFee: 0,
      settlementTime: null,
      userId: 0,
      userName: '',
      remark: ''
    },
    numberRules: [v => !!v || '请输入客户编号'],
    nameRules: [v => !!v || '请输入客户名称'],
    inBillingData: [],
    outBillingData: []
  }),
  methods: {
    init() {
      this.settlementInfo = {
        customerId: 0,
        startTime: this.$moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        endTime: this.$moment().format('YYYY-MM-DD'),
        discount: 0.0,
        remission: 0.0,
        dueFee: 0,
        settlementTime: null,
        userId: 0,
        userName: '',
        remark: ''
      }

      this.loading = false
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    async startSettle() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

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
      }
    },

    submit2() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        this.settlementInfo.userId = this.$store.state.user.id
        this.settlementInfo.userName = this.$store.state.user.name

        settlement
          .create(this.settlementInfo)
          .then(res => {
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
