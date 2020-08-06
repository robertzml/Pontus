<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">出库单确认</v-card-title>
      <v-card-text>是否确认该出库单已经出库完成？请确认所有出库货物已经下架，确认后无法再增加货物。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text @click="finish" :loading="loading">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockOut from '@/controllers/stockOut'

export default {
  name: 'StockOutDelete',
  data: () => ({
    loading: false,
    dialog: false,
    stockOutId: ''
  }),
  methods: {
    init(id) {
      this.stockOutId = id
      this.loading = false
      this.dialog = true
    },

    // 确认出库单完成
    finish() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      stockOut.confirm({ id: this.stockOutId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '出库单已确认')
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
