<template>
  <v-data-table :headers="headers" :items="taskInfoList" hide-default-footer>
    <template v-slot:item.status="{ item }">
      {{ item.status | displayStatus }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn small color="success" @click="editItem(item)">
        编辑
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInTaskList',
  data: () => ({
    stockInId: '',
    headers: [
      { text: '托盘码', value: 'trayCode', align: 'left' },
      { text: '类别ID', value: 'categoryId' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'inWeight' },
      { text: '规格', value: 'specification' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
      { text: '备注', value: 'remark' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: []
  }),
  methods: {
    init(stockInId) {
      this.stockInId = stockInId

      this.loadTaskList()
    },

    loadTaskList() {
      let vm = this
      stockIn.getTaskList(this.stockInId).then(res => {
        vm.taskInfoList = res
      })
    },

    editItem(val) {}
  }
}
</script>
