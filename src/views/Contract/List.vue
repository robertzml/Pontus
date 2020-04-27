<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title class="orange">
            合同列表
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
          </v-card-title>
          <v-card-text class="px-0">
            <v-data-table :headers="headers" :items="contractListData" :search="search" :items-per-page="10">
              <template v-slot:item.type="{ item }">
                {{ item.type | contractType }}
              </template>
              <template v-slot:item.signDate="{ item }">
                {{ item.signDate | displayDate }}
              </template>
              <template v-slot:item.closeDate="{ item }">
                {{ item.closeDate | displayDate }}
              </template>
              <template v-slot:item.billingType="{ item }">
                {{ item.billingType | billingType }}
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
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import contract from '@/controllers/contract'

export default {
  name: 'ContractList',
  data: () => ({
    search: '',
    contractListData: [],
    headers: [
      { text: '编号', value: 'number', align: 'left' },
      { text: '合同名称', value: 'name' },
      { text: '客户代码', value: 'customerNumber' },
      { text: '所属客户', value: 'customerName' },
      { text: '合同类型', value: 'type' },
      { text: '签订日期', value: 'signDate' },
      { text: '关闭日期', value: 'closeDate' },
      { text: '计费方式', value: 'billingType' },
      { text: '冷藏费单价', value: 'unitPrice' },
      { text: '最短天数', value: 'parameter1' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: mapState({
    refreshEvent: state => state.contract.refreshEvent
  }),
  watch: {
    refreshEvent: function() {
      this.loadList()
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'contract/showDetails'
    }),
    ...mapMutations({
      setContractInfo: 'contract/setContractInfo'
    }),

    loadList() {
      let vm = this
      contract.getList().then(res => {
        vm.contractListData = res
      })
    },

    viewItem(item) {
      this.setContractInfo(item)
      this.showDetails()
    }
  },
  mounted: function() {
    this.loadList()
  }
}
</script>
