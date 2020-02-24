<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="headline">删除搬运入库任务</v-card-title>
      <v-card-text>是否确认删除该搬运入库任务？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text :loading="loading" @click="deleteCarryIn">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInDelete',
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

    // 删除搬运入库任务
    deleteCarryIn() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      carryIn.delete({ id: this.taskId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除搬运入库任务成功')
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
