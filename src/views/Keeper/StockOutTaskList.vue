<template>
  <v-card class="px-2 mt-2">
    <v-subheader class="subtitle-1 teal--text text--lighten-2">
      出库货物列表
      <v-spacer></v-spacer>
      <span class="subtitle-2 ml-4">出库总数量: {{ totalCount }}</span>
      <span class="subtitle-2 ml-4">出库总重量: {{ totalWeight }} 吨</span>
    </v-subheader>
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
import { mapState, mapActions } from 'vuex'
import stockOut from '@/controllers/stockOut'

export default {
  name: 'KeeperStockOutTaskList',
  data: () => ({
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '在库数量', value: 'storeCount' },
      { text: '出库数量', value: 'outCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '出库重量(t)', value: 'outWeight' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: []
  }),
  computed: {
    ...mapState({
      stockOutId: state => state.keeper.stockOutId,
      refreshEvent: state => state.keeper.refreshEvent
    }),
    totalCount: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        total += item.outCount
      })

      return total
    },
    totalWeight: function() {
      let total = 0
      this.taskInfoList.forEach(item => {
        total += item.outWeight
      })

      return total.toFixed(4)
    }
  },
  watch: {
    stockOutId: function() {
      this.loadTaskList()
    },
    refreshEvent: function() {
      this.loadTaskList()
    }
  },
  methods: {
    ...mapActions({
      showStockOutTaskDetails: 'keeper/showStockOutTaskDetails'
    }),

    // 载入出库任务列表
    loadTaskList() {
      if (this.stockOutId) {
        let vm = this
        stockOut.getTaskList(this.stockOutId).then(res => {
          vm.taskInfoList = res
        })
      }
    },

    viewTaskItem(item) {
      this.showStockOutTaskDetails(item.id)
    }
  },
  mounted: function() {
    this.loadTaskList()
  }
}
</script>
