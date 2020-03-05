<template>
  <v-row dense>
    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="4">
                <customer-select :customer-id.sync="search.customerId" :required="true"></customer-select>
              </v-col>

              <v-col cols="4">
                <v-select
                  :items="contractListData"
                  label="选择合同*"
                  :rules="contractRules"
                  :hint="`${search.selectedContract.number}`"
                  item-text="name"
                  item-value="id"
                  v-model="search.selectedContract"
                  persistent-hint
                  return-object
                ></v-select>
              </v-col>

              <v-col cols="4">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="searchStore">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="3">
              <v-select
                v-model="filter.status"
                :items="$dict.storeStatus"
                label="库存状态"
                item-text="text"
                item-value="value"
                hide-details
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <cargo-select :cargo-id.sync="filter.cargoId" :cargo-data="cargoList" :required="false"></cargo-select>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="filter.search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="orange">
          库存列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="filterData" :search="filter.search" :items-per-page="10">
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
              <v-btn small color="primary" @click="viewItem(item)">
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
import { mapState, mapActions } from 'vuex'
import store from '@/controllers/store'
import contract from '@/controllers/contract'
import cargo from '@/controllers/cargo'
import CustomerSelect from '@/components/Control/CustomerSelect'
import CargoSelect from '@/components/Control/CargoSelect'

export default {
  name: 'StoreList',
  components: {
    CustomerSelect,
    CargoSelect
  },
  data: () => ({
    valid: false,
    loading: false,
    search: {
      customerId: 0,
      selectedContract: { number: '' }
    },
    filter: {
      status: 0,
      cargoId: '',
      search: ''
    },
    contractListData: [],
    contractRules: [v => !!v.id || '请选择合同'],
    cargoList: [],
    storeData: [],
    headers: [
      { text: '客户名称', value: 'customerName' },
      { text: '托盘码', value: 'trayCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '货品总数量', value: 'totalCount' },
      { text: '货品总重量(t)', value: 'totalWeight' },
      { text: '入库时间', value: 'inTime' },
      { text: '出库时间', value: 'outTime' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  watch: {
    'search.customerId': function(val) {
      this.loadContract(val)
      this.loadCargoData(val)
    },
    refreshEvent: function() {
      this.searchStore()
    }
  },
  computed: {
    ...mapState({
      refreshEvent: state => state.store.refreshEvent
    }),
    filterData() {
      let temp = this.storeData

      if (this.filter.status) {
        temp = temp.filter(r => r.status == this.filter.status)
      }

      if (this.filter.cargoId) {
        temp = temp.filter(r => r.cargoId == this.filter.cargoId)
      }

      return temp
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'store/showDetails'
    }),

    async loadStore() {
      this.storeData = await store.list()
    },

    // 载入合同
    async loadContract(customerId) {
      if (customerId) {
        this.contractListData = await contract.getList(customerId)
        if (this.contractListData.length > 0) {
          this.search.selectedContract = this.contractListData[0]
        }
      } else {
        this.contractListData = []
      }
    },

    // 载入货品
    loadCargoData(customerId) {
      if (customerId) {
        let vm = this
        cargo.getList(customerId).then(res => {
          vm.cargoList = res
        })
      } else {
        this.cargoList = []
      }
    },

    // 搜索库存
    async searchStore() {
      if (this.$refs.form.validate()) {
        this.storeData = await store.findByContract(this.search.selectedContract.id)
      }
    },

    // 查看库存信息
    viewItem(item) {
      this.showDetails(item.id)
    }
  },
  mounted: function() {
    // this.loadStore()
  }
}
</script>
