<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">出库货物确认</v-card-title>
      <v-card-text>是否确认该货物已经出库完成？请确认所有搬运任务已经下架，确认后无法再下发任务。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text @click="finishTask" :loading="loading">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockOut from '@/controllers/stockOut'

export default {
  name: 'StockOutTaskFinish',
  data: () => ({
    dialog: false,
    loading: false,
    taskId: ''
  }),
  methods: {
    init(id) {
      this.taskId = id
      this.loading = false
      this.dialog = true
    },

    // 完成任务
    finishTask() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      stockOut.finishTask({ taskId: this.taskId }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '确认任务成功')
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
