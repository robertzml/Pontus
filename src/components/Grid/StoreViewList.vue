<template>
  <v-data-table :headers="headers" :items="storeListData" :search="search" :items-per-page="10">
    <template v-slot:item.inTime="{ item }">
      {{ item.inTime | displayDate }}
    </template>
    <template v-slot:item.billingType="{ item }">
      {{ item.billingType | billingType }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn small color="success" @click="addStockOut(item)">
        出库
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'StoreViewGrid',
  props: {
    storeListData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    headers: [
      { text: '分类编码', value: 'categoryNumber' },
      { text: '分类名称', value: 'categoryName' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '托盘码', value: 'trayCode' },
      { text: '货品总数量', value: 'totalCount' },
      { text: '在库数量', value: 'storeCount' },
      { text: '货品总重量(吨)', value: 'totalWeight' },
      { text: '在库重量(吨)', value: 'storeWeight' },
      { text: '入库时间', value: 'inTime' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    addStockOut(item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>
