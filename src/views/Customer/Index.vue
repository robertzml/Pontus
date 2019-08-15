<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-window v-model="window">
        <v-window-item value="list" :eager="true">
          <customer-list @toDetails="toDetails"></customer-list>
        </v-window-item>
        <v-window-item value="details" :eager="true">
          <customer-details ref="detailsMod" @toList="toList"></customer-details>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomerList from './List'
import CustomerDetails from './Details'

export default {
  name: 'CustomerIndex',
  components: {
    CustomerList,
    CustomerDetails
  },
  data: () => ({
    window: 'list'
  }),
  methods: {
    toDetails(id) {
      this.window = 'details'
      this.$refs.detailsMod.getInfo(id)
    },
    toList() {
      this.window = 'list'
    }
  },
  mounted: function() {
    let vm = this
    this.$axios
      .get('/customer/list')
      .then(function(res) {
        vm.customerData = res.data
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
</script>
