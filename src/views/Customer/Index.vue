<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>客户管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'CustomerDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="tab == 'CustomerDetails'" text @click.stop="showEdit">编辑客户</v-btn>
          <v-btn text @click.stop="showCreate">添加客户</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <customer-edit ref="customerEditMod" @update="refresh"></customer-edit>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CustomerList from './List'
import CustomerDetails from './Details'
import CustomerEdit from './Edit'

export default {
  name: 'CustomerIndex',
  components: {
    CustomerList,
    CustomerDetails,
    CustomerEdit
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: state => state.customer.tab,
      customerInfo: state => state.customer.customerInfo
    })
  },
  methods: {
    ...mapMutations({
      refresh: 'customer/refresh'
    }),

    ...mapActions({
      showList: 'customer/showList',
      refreshCustomer: 'customer/refreshCustomer'
    }),

    showCreate() {
      this.$refs.customerEditMod.init(0)
    },
    showEdit() {
      this.$refs.customerEditMod.init(this.customerInfo.id)
    }
  },
  mounted: function() {
    this.showList()
  }
}
</script>
