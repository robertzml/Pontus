<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title class="orange">
            客户列表
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
          </v-card-title>
          <v-card-text class="px-0">
            <v-data-table :headers="headers" :items="customerData" :search="search" :items-per-page="10">
              <template v-slot:[`item.type`]="{ item }">
                {{ item.type | customerType }}
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn small color="success" @click="viewItem(item)">
                  <v-icon left dark>pageview</v-icon>
                  查看
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import customer from '@/controllers/customer'

export default {
  name: 'CustomerList',
  data: () => ({
    search: '',
    customerData: [],
    headers: [
      { text: '编号', value: 'number', align: 'left' },
      { text: '客户名称', value: 'name' },
      { text: '客户类型', value: 'type' },
      { text: '地址', value: 'address' },
      { text: '电话', value: 'telephone' },
      { text: '联系人', value: 'contact' },
      { text: '身份证号', value: 'identityCard' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: mapState({
    refreshEvent: (state) => state.customer.refreshEvent
  }),
  watch: {
    refreshEvent: function () {
      this.loadList()
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'customer/showDetails'
    }),
    ...mapMutations({
      setCustomerInfo: 'customer/setCustomerInfo'
    }),
    loadList() {
      let vm = this
      customer.getList().then((res) => {
        vm.customerData = res
      })
    },
    viewItem(item) {
      this.setCustomerInfo(item)
      this.showDetails()
    }
  },
  mounted: function () {
    this.loadList()
  }
}
</script>
