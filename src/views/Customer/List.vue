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
        <v-card-title class="orange">
          客户列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="customerData" :search="search" :items-per-page="10">
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewItem(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
              <v-icon small @click="editItem(item)">
                edit
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomerEdit from '@/components/Customer/Edit'

export default {
  name: 'CustomerList',
  components: {
    CustomerEdit
  },
  data: () => ({
    search: '',
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
    },
    viewItem(item) {
      this.$emit('toDetails', item.id)
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
