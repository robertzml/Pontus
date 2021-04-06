<template>
  <v-autocomplete
    label="请选择客户"
    prepend-icon="people"
    v-model="selectedCustomer"
    :filter="customFilter"
    :items="customerData"
    item-value="id"
    clearable
    return-object
    :rules="customerRules"
    :hide-details="!required"
    @change="selectItem"
  >
    <template v-slot:selection="data"> {{ data.item.number }} - {{ data.item.name }} </template>
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
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    customerData: [],
    selectedCustomer: null,
    customerRules2: [(v) => (!!v && v.id != 0) || '请选择客户']
  }),
  watch: {
    customerId: function () {
      if (this.customerId) {
        this.selectedCustomer = this.customerData.find((r) => r.id == this.customerId)
      } else {
        this.selectedCustomer = null
      }
    }
  },
  computed: {
    customerRules() {
      let rules = []

      if (this.required) {
        const rule = (v) => (!!v && v.id != 0) || '请选择客户'
        rules.push(rule)
      }

      return rules
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name
      const textTwo = item.number
      const searchText = queryText

      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
    },

    selectItem(val) {
      if (val == null || val == undefined) {
        this.$emit('update:customerId', 0)
      } else {
        this.$emit('update:customerId', val.id)
      }
    }
  },
  mounted: function () {
    let vm = this
    customer.getList().then((res) => {
      vm.customerData = res
    })
  }
}
</script>
