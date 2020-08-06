<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">删除入库单</v-card-title>
      <v-card-text>是否确认删除该入库单？仅能删除无入库货物的入库单。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text :loading="loading" @click="deleteStockIn">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInDelete',
  data: () => ({
    dialog: false,
    loading: false,
    stockInId: ''
  }),
  methods: {
    init(id) {
      this.stockInId = id
      this.loading = false
      this.dialog = true
    },

    // 删除入库单
    deleteStockIn() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      stockIn.deleteStockIn({ id: this.stockInId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库单已删除')
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
