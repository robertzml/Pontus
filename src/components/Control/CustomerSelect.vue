<template>
  <v-autocomplete label="请选择客户" prepend-icon="people" v-model="sCustomerId" :filter="customFilter" :items="customerData" item-value="id" item-text="name" return-object :rules="customerRules" @change="selectItem">
    <template v-slot:selection="data">
      {{ data.item.number }} - {{ data.item.name }}
    </template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title v-html="data.item.name"></v-list-item-title>
        <v-list-item-subtitle v-html="data.item.number"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import customer from '@/controllers/customer'

export default {
  name: 'CustomerSelect',
  props: {
    customerId: {
      type: Number
    }
  },
  data: () => ({
    customerData: [],
    sCustomerId: null,
    selectCustomer: null,
    customerRules: [v => (!!v && v.id != 0) || '请选择客户']
  }),
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name
      const textTwo = item.number
      const searchText = queryText

      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
    },

    selectItem(val) {
      if (val == null || val == undefined) {
        this.selectCustomer = null
        this.$emit('update:customerId', 0)
      } else {
        this.selectCustomer = val
        this.$emit('update:customerId', val.id)
      }
    }
  },
  mounted: function() {
    let vm = this
    customer.getList().then(res => {
      vm.customerData = res
      vm.sCustomerId = vm.customerId
    })
  }
}
</script>
