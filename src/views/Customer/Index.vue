<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>客户管理</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="orange">
          客户列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :search="search" :items-per-page="10">
            <template v-slot:[`item.type`]="{ item }">
              {{ item.type | customerType }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import { findAll } from '@/api/customer'
import getCustomerRepository from '@/composables/customerRepository'

export default defineComponent({
  name: 'CustomerIndex',
  setup() {
    const ctx = getCustomerRepository()

    console.log(ctx)
    return {
      ctx
    }
  },
  data: () => ({
    search: '',
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
  })
})
</script>
