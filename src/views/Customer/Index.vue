<template>
  <v-row dense>
    <v-col cols="12" class="pt-0">
      <v-toolbar dense>
        <v-toolbar-title>客户管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab != 'CustomerList'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <customer-list @show-item="showItem"></customer-list>
      <v-slide-x-transition leave-absolute>
        <keep-alive>
          <component v-bind:is="tab"></component>
        </keep-alive>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <v-navigation-drawer v-model="drawer" fixed right temporary width="620">
        <customer-details :info="currentCustomer"></customer-details>
      </v-navigation-drawer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CustomerList from './Section/CustomerList.vue'
import CustomerDetails from './Section/CustomerDetails.vue'
import { ICustomerData, createCustomer } from '@/models/customer'

/**
 * 客户页面视图
 * @title 页面
 */
@Component({
  components: {
    CustomerList,
    CustomerDetails
  },

  setup() {
    // console.log('setup in customer index')
  }
})
export default class CustomerIndex extends Vue {
  tab = ''

  drawer = false

  currentCustomer: ICustomerData = createCustomer()

  /**
   * 显示客户列表
   */
  showList(): void {
    this.tab = 'CustomerList'
  }

  /**
   * 显示客户信息
   */
  showItem(item: ICustomerData): void {
    this.currentCustomer = item
    this.drawer = true
  }

  refresh(): void {
    console.log('refresh')
  }
}
</script>
