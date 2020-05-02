<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          缴费信息
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
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import payment from '@/controllers/payment'

export default {
  name: 'PaymentDetails',
  data: () => ({
    paymentInfo: {}
  }),
  computed: mapState({
    paymentId: state => state.payment.paymentId,
    refreshEvent: state => state.payment.refreshEvent
  }),
  watch: {
    refreshEvent: function() {
      this.loadInfo()
    }
  },
  methods: {
    async loadInfo() {
      this.paymentInfo = await payment.get(this.paymentId)
    }
  },
  activated: function() {
    this.loadInfo()
  }
}
</script>
