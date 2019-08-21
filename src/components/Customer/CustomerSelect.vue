<template>
  <v-autocomplete label="请选择客户" prepend-icon="people" :items="customerData" item-value="id" item-text="name">
  </v-autocomplete>
</template>

<script>
export default {
  name: 'CustomerSelect',
  data: () => ({
    customerData: []
  }),
  mounted: function() {
    let vm = this
    this.$store.dispatch('getCustomerList').then(res => {
      vm.customerData = res
    })
  }
}
</script>