<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="headline">删除货品</v-card-title>
      <v-card-text>是否确认删除该货品？仅能删除未使用过的货品。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text @click="deleteCargo" :loading="loading">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import cargo from '@/controllers/cargo'

export default {
  name: 'CargoDelete',
  data: () => ({
    loading: false,
    dialog: false,
    cargoId: ''
  }),
  methods: {
    init(id) {
      this.cargoId = id
      this.loading = false
      this.dialog = true
    },

    // 删除货品
    deleteCargo() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      cargo.delete({ id: this.cargoId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '货品已删除')
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
