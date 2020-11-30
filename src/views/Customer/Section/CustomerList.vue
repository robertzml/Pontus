<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="orange">
          客户列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="ctx.customers" :search="search" :items-per-page="10">
            <template v-slot:[`item.type`]="{ item }">
              {{ $util.customerType(item.type) }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn small color="success" @click="viewItem(item)">
                <v-icon left dark>mdi-card-search</v-icon>
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getCustomerRepository, CustomerContext } from '@/composables/customerRepository'
import { ICustomerData } from '@/models/customer'

/**
 * 客户列表部件
 */
@Component({
  setup() {
    const ctx = getCustomerRepository()

    return {
      ctx
    }
  }
})
export default class CustomerList extends Vue {
  search = ''

  /**
   * 表格列定义
   */
  headers = [
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

  ctx!: CustomerContext

  /**
   * 显示客户
   * @event show-item
   */
  viewItem(item: ICustomerData): void {
    this.$emit('show-item', item)
  }
}
</script>
