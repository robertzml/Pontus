<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <v-card>
      <v-card-title class="headline">搬运出库任务确认</v-card-title>
      <v-card-text>是否确认该任务已经出库完成？临时搬运出库任务会自动生成相应搬运入库任务。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text :loading="loading" @click="finishTask">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import carryOut from '@/controllers/carryOut'

export default {
  name: 'CarryOutFinish',
  data: () => ({
    loading: false,
    dialog: false,
    carryOutId: ''
  }),
  methods: {
    init(id) {
      this.carryOutId = id
      this.loading = false
      this.dialog = true
    },

    // 完成任务
    finishTask() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      carryOut.finishTask({ taskId: this.carryOutId, userId: this.$store.state.user.id }).then(res => {
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
