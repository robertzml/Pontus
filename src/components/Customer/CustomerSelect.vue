<template>
  <v-autocomplete label="请选择客户" prepend-icon="people" :items="customerData" item-value="id" item-text="name">
    <template v-slot:prepend-item>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
        </tr>
      </thead>
    </template>
    <template v-slot:item="data">
      <tr>
        <td v-text="data.item.name"></td>
        <td v-text="data.item.number"></td>
      </tr>
    </template>
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