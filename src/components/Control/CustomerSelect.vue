<template>
  <v-autocomplete label="请选择客户" prepend-icon="people" :items="customerData" item-value="id" item-text="name" return-object @change="selectItem">
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
export default {
  name: 'CustomerSelect',
  props: {
    customerId: {
      type: Number
    }
  },
  data: () => ({
    customerData: []
  }),
  methods: {
    selectItem(val) {
      console.log(val)
      // this.customerId = val.id
      this.$emit('update:customerId', val.id)
    }
  },
  mounted: function() {
    let vm = this
    this.$store.dispatch('getCustomerList').then(res => {
      vm.customerData = res
    })
  }
}
</script>