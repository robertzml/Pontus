<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card flat>
      <v-card-title class="blue darken-3">
        入库货物信息
      </v-card-title>

      <v-card-text>
        <stock-in-task-details-view :task-info="taskInfo"> </stock-in-task-details-view>
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
import StockInTaskDetailsView from '@/components/View/StockInTaskDetailsView'

export default {
  name: 'ReceiptStockInTaskDetails',
  components: {
    StockInTaskDetailsView
  },
  data: () => ({
    dialog: false,
    taskInfo: {}
  }),
  methods: {
    init(id) {
      let vm = this
      stockIn.getTask(id).then(res => {
        vm.taskInfo = res
      })
      this.dialog = true
    }
  }
}
</script>
