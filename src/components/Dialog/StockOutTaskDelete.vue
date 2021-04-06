<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">删除入库货物</v-card-title>
      <v-card-text>是否确认删除该入库货物？仅能删除未下发搬运任务的入库货物。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text @click="deleteTask" :loading="loading">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockOut from '@/controllers/stockOut'

export default {
  name: 'StockOutTaskDelete',
  data: () => ({
    loading: false,
    dialog: false,
    taskId: ''
  }),
  methods: {
    init(id) {
      this.taskId = id
      this.loading = false
      this.dialog = true
    },

    // 删除出库任务
    deleteTask() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      stockOut.deleteTask({ taskId: this.taskId }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除任务成功')
          vm.$emit('close')
          vm.loading = false
          vm.dialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  }
}
</script>
