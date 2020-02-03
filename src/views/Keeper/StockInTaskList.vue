<template>
  <v-card class="px-2 mt-2">
    <v-subheader class="subtitle-1 teal--text text--lighten-2">入库货物列表</v-subheader>
    <v-data-table :headers="headers" :items="taskInfoList" hide-default-footer disable-pagination>
      <template v-slot:item.status="{ item }">
        {{ item.status | displayStatus }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn small color="primary" @click="viewTaskItem(item)">
          查看
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import stockIn from '@/controllers/stockIn'

export default {
  name: 'KeeperStockInTaskList',
  data: () => ({
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '类别名称', value: 'categoryName' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'inWeight' },
      { text: '批次', value: 'batch' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: []
  }),
  computed: {
    ...mapState({
      stockInId: state => state.keeper.stockInId,
      refreshEvent: state => state.keeper.refreshEvent
    })
  },
  watch: {
    stockInId: function() {
      this.loadTaskList()
    },
    refreshEvent: function() {
      this.loadTaskList()
    }
  },
  methods: {
    ...mapActions({
      showStockInTaskDetails: 'keeper/showStockInTaskDetails'
    }),

    ...mapMutations({
      setStockInTaskId: 'keeper/setStockInTaskId'
    }),

    // 载入入库任务列表
    loadTaskList() {
      if (this.stockInId) {
        let vm = this
        stockIn.getTaskList(this.stockInId).then(res => {
          vm.taskInfoList = res
        })
      }
    },

    viewTaskItem(item) {
      this.setStockInTaskId(item.id)
      this.showStockInTaskDetails()
    }
  },
  mounted: function() {
    this.loadTaskList()
  }
}
</script>
