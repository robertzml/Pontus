<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card flat>
      <v-card-title class="brown darken-3">
        出库货物信息
      </v-card-title>

      <v-card-text>
        <stock-out-task-details-view :task-info="taskInfo"> </stock-out-task-details-view>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="dialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockOut from '@/controllers/stockOut'
import StockOutTaskDetailsView from '@/components/View/StockOutTaskDetailsView'

export default {
  name: 'ReceiptStockOutTaskDetails',
  components: {
    StockOutTaskDetailsView
  },
  data: () => ({
    dialog: false,
    taskInfo: {}
  }),
  methods: {
    init(id) {
      let vm = this
      stockOut.getTask(id).then(res => {
        vm.taskInfo = res
      })
      this.dialog = true
    }
  }
}
</script>
