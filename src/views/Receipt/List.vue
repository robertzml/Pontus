<template>
  <v-row dense>
    <v-col cols="12">
      <v-tabs v-model="tab" grow>
        <v-tab>入库单列表</v-tab>
        <v-tab>出库单列表</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-title class="teal lighten-2">
              入库单
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
            </v-card-title>

            <v-data-table :headers="stockInHeaders" :items="stockInListData" :search="search" :items-per-page="10">
              <template v-slot:item.inTime="{ item }">
                {{ item.inTime | displayDate }}
              </template>
              <template v-slot:item.type="{ item }">
                {{ $util.stockInType(item.type) }}
              </template>
              <template v-slot:item.status="{ item }">
                {{ item.status | displayStatus }}
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn small color="success" @click="viewItem(item)">
                  <v-icon left dark>pageview</v-icon>
                  查看
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'ReceiptList',
  data: () => ({
    tab: null,
    search: '',
    stockInListData: [],
    stockInHeaders: [
      { text: '编号', value: 'flowNumber', align: 'left' },
      { text: '入库时间', value: 'inTime' },
      { text: '入库类型', value: 'type' },
      { text: '客户编号', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' }
    ]
  }),
  methods: {
    loadStockInList() {
      let vm = this
      stockIn.getList().then(res => {
        vm.stockInListData = res
      })
    }
  },
  mounted: function() {
    this.loadStockInList()
  }
}
</script>
