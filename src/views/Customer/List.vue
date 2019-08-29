<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card dark>
        <v-card-title class="orange">
          客户列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="customerData" :search="search" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | customerType }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewItem(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
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
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    loadList() {
      let vm = this
      this.$store.dispatch('getCustomerList').then(res => {
        vm.customerData = res
      })
    },
    viewItem(item) {
      this.$emit('toDetails', item.id)
    }
  },
  mounted: function() {
    this.loadList()
  }
}
</script>
