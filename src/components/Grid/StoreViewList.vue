<template>
  <v-data-table :headers="headers" :items="storeListData" :search="search" :items-per-page="10">
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
      { text: '所属客户', value: 'customerName' },
      { text: '合同类型', value: 'type' },
      { text: '签订日期', value: 'signDate' },
      { text: '关闭日期', value: 'closeDate' },
      { text: '计费方式', value: 'billingType' },
      { text: '冷藏费单价', value: 'unitPrice' },
      { text: '操作', value: 'action', sortable: false }
    ]
  })
}
</script>
