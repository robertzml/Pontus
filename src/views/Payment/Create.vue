<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">添加缴费信息</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <customer-select :customer-id.sync="paymentInfo.customerId"></customer-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="票号" v-model="paymentInfo.ticketNumber"></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="缴费金额" v-model="paymentInfo.paidFee" suffix="元"></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-menu
                v-model="paidTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="paymentInfo.paidTime" label="缴费日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="paymentInfo.paidTime" :day-format="$util.pickerDayFormat" @input="paidTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.paidType" label="缴费方式*" v-model="paymentInfo.paidType"></v-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" v-model="paymentInfo.remark"></v-text-field>
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
import payment from '@/controllers/payment'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'PaymentCreate',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: true,
    loading: false,
    dialog: false,
    paidTimeMenu: false,
    paymentInfo: {
      ticketNumber: '',
      paidFee: 0,
      paidTime: null,
      paidType: 0,
      userId: 0,
      remark: ''
    },
    numberRules: [v => !!v || '请输入客户编号'],
    nameRules: [v => !!v || '请输入客户名称']
  }),
  methods: {
    init() {
      this.paymentInfo = {
        ticketNumber: '',
        paidFee: 0,
        paidTime: this.$moment().format('YYYY-MM-DD'),
        paidType: 1,
        userId: 0,
        remark: ''
      }

      this.loading = false
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        this.paymentInfo.userId = this.$store.state.user.id
        this.paymentInfo.userName = this.$store.state.user.name

        payment
          .create(this.paymentInfo)
          .then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加缴费记录成功')
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
