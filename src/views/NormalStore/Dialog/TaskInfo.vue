<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <v-card>
      <v-card-subtitle>入库货物信息</v-card-subtitle>
      <v-card-text>
        <stock-in-task-details-view :task-info="stockInTaskInfo"> </stock-in-task-details-view>
      </v-card-text>

      <v-card-subtitle>出库货物信息</v-card-subtitle>
      <v-card-text>
        <stock-out-task-details-view :task-info="stockOutTaskInfo"> </stock-out-task-details-view>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="dialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockIn from '@/controllers/stockIn'
import stockOut from '@/controllers/stockOut'
import StockInTaskDetailsView from '@/components/View/StockInTaskDetailsView'
import StockOutTaskDetailsView from '@/components/View/StockOutTaskDetailsView'

export default {
  name: 'NormalStoreTaskInfo',
  components: {
    StockInTaskDetailsView,
    StockOutTaskDetailsView
  },
  data: () => ({
    dialog: false,
    stockInTaskInfo: {},
    stockOutTaskInfo: {}
  }),
  methods: {
    async init(stockInTaskId, stockOutTaskId) {
      this.dialog = true

      if (stockInTaskId) {
        this.stockInTaskInfo = await stockIn.getTask(stockInTaskId)
      } else {
        this.stockInTaskInfo = {}
      }

      if (stockOutTaskId) {
        this.stockOutTaskInfo = await stockOut.getTask(stockOutTaskId)
      } else {
        this.stockOutTaskInfo = {}
      }
    }
  }
}
</script>
