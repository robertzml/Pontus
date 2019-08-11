<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">客户管理</v-card-title>
        <v-card-text>
          I'm card text
          <v-combobox v-model="select" :items="items" label="Select a favorite activity or create a new one"></v-combobox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="primary">添加客户</v-btn>
          <v-btn small color="primary" @click.stop="openMod">Open Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <customer-edit ref="customerMod"></customer-edit>

    <v-flex xs12>
      <v-card dark>
        <v-card-title class="orange">客户列表</v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="customerData" :items-per-page="10">\
            <template v-slot:item.action="{ item }">
              <v-icon small @click="editItem(item)">
                edit
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex v-for="i in 2" :key="`6${i}`" xs6>
      <v-card dark color="secondary">
        <v-card-text class="px-0">6</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomerEdit from '@/components/Customer/Edit'

export default {
  name: 'customer',
  components: {
    CustomerEdit
  },
  data: () => ({
    select: 'Programming',
    items: ['Programming', 'Design', 'Vue', 'Vuetify'],
    dialog: false,
    customerData: [],
    headers: [
      { text: '编号', value: 'number', align: 'left' },
      { text: '客户名称', value: 'name' },
      { text: '地址', value: 'address' },
      { text: '电话', value: 'telephone' },
      { text: '联系人', value: 'contact' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    openMod() {
      this.$refs.customerMod.init(0)
    }
  },
  mounted: function() {
    console.log('customer')
    let vm = this
    this.axios
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
