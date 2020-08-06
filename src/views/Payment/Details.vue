<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          缴费信息
          <v-spacer></v-spacer>
          <v-btn text v-if="userInfo.userGroupId == 1" @click="dialog = true">删除缴费</v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="paymentInfo.customerNumber" label="客户编号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="paymentInfo.customerName" label="客户名称" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="paymentInfo.ticketNumber" label="票号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="paymentInfo.paidFee" label="缴费金额" readonly suffix="元"></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDate(paymentInfo.paidTime)" label="缴费日期" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.paidType(paymentInfo.paidType)" label="缴费方式" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="paymentInfo.userName" label="登记人" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(paymentInfo.createTime)" label="登记时间" readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field v-model="paymentInfo.remark" label="备注" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">删除缴费记录</v-card-title>
          <v-card-text>是否确认删除该缴费记录？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
            <v-btn color="green darken-1" text :loading="loading" @click="deletePayment">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import payment from '@/controllers/payment'

export default {
  name: 'PaymentDetails',
  data: () => ({
    paymentInfo: {},
    dialog: false,
    loading: false
  }),
  computed: {
    ...mapState({
      paymentId: state => state.payment.paymentId,
      refreshEvent: state => state.payment.refreshEvent
    }),
    ...mapGetters(['userInfo'])
  },
  watch: {
    refreshEvent: function() {
      this.loadInfo()
    }
  },
  methods: {
    ...mapActions({
      showList: 'payment/showList'
    }),

    async loadInfo() {
      this.paymentInfo = await payment.find(this.paymentId)
    },

    deletePayment() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      payment.delete({ id: this.paymentId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除缴费记录成功')
          vm.loading = false
          vm.dialog = false
          vm.showList()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  },
  activated: function() {
    this.loadInfo()
  }
}
</script>
