<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>库存列表</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="4">
                <customer-select :customer-id.sync="filter.customerId" :required="true"></customer-select>
              </v-col>

              <v-col cols="4">
                <v-select
                  :items="contractListData"
                  label="选择合同*"
                  :rules="contractRules"
                  :hint="`${filter.selectedContract.number}`"
                  item-text="name"
                  item-value="id"
                  v-model="filter.selectedContract"
                  persistent-hint
                  return-object
                ></v-select>
              </v-col>

              <v-col cols="4">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="search">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="orange">
          库存列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="storeData" :items-per-page="10">
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.inTime="{ item }">
              {{ item.inTime | displayDate }}
            </template>
            <template v-slot:item.outTime="{ item }">
              {{ item.outTime | displayDate }}
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
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/controllers/store'
import contract from '@/controllers/contract'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StoreList',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: false,
    loading: false,
    filter: {
      customerId: 0,
      selectedContract: { number: '' }
    },
    contractListData: [],
    contractRules: [v => !!v.id || '请选择合同'],
    storeData: [],
    headers: [
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '托盘码', value: 'trayCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '货品总数量', value: 'totalCount' },
      { text: '货品总重量', value: 'totalWeight' },
      { text: '入库时间', value: 'inTime' },
      { text: '出库时间', value: 'outTime' },
      { text: '状态', value: 'status' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  watch: {
    'filter.customerId': function(val) {
      this.loadContract(val)
    }
  },
  methods: {
    ...mapActions({
      showStoreDetails: 'store/showStoreDetails'
    }),

    async loadStore() {
      this.storeData = await store.list()
    },

    // 载入合同
    async loadContract(customerId) {
      if (customerId) {
        this.contractListData = await contract.getList(customerId)
      } else {
        this.contractListData = []
      }
    },

    // 搜索库存
    async search() {
      if (this.$refs.form.validate()) {
        this.storeData = await store.findByContract(this.filter.selectedContract.id)
      }
    },

    // 查看库存信息
    viewItem(item) {
      this.showStoreDetails(item.id)
    }
  },
  mounted: function() {
    // this.loadStore()
  }
}
</script>
