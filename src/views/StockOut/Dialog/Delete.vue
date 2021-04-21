<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">删除出库单</v-card-title>
      <v-card-text>是否确认删除该出库单？仅能删除无出库货物的出库单。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text @click="deleteStockOut" :loading="loading">确定</v-btn>
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

    // 删除出库单
    deleteStockOut() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      stockOut.deleteStockOut({ id: this.stockOutId }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '出库单已删除')
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
