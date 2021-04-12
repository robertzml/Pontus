<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>缴费管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'PaymentDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="tab == 'PaymentDetails'" text @click.stop="showEdit">编辑缴费</v-btn>
          <v-btn v-if="tab == 'PaymentList'" text @click.stop="showCreate">添加缴费</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <keep-alive>
          <component v-bind:is="tab"></component>
        </keep-alive>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <payment-create ref="paymentCreateMod" @close="refresh"></payment-create>
      <payment-edit ref="paymentEditMod" @close="refresh"></payment-edit>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import PaymentList from './List'
import PaymentDetails from './Details'
import PaymentCreate from './Create'
import PaymentEdit from './Edit'

export default {
  name: 'PaymentIndex',
  components: {
    PaymentList,
    PaymentDetails,
    PaymentCreate,
    PaymentEdit
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: (state) => state.payment.tab,
      paymentId: (state) => state.payment.paymentId
    })
  },
  methods: {
    ...mapMutations({
      refresh: 'payment/refresh'
    }),

    ...mapActions({
      showList: 'payment/showList'
    }),

    showCreate() {
      this.$refs.paymentCreateMod.init()
    },

    showEdit() {
      this.$refs.paymentEditMod.init(this.paymentId)
    }
  }
}
</script>
