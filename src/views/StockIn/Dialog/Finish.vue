<template>
  <v-dialog v-model="finishDialog" persistent max-width="300">
    <v-card>
      <v-card-title class="text-h5">入库单确认</v-card-title>
      <v-card-text>是否确认该入库单已经入库完成？请确认所有入库货物已经上架，确认后无法再增加货物。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="finishDialog = false">取消</v-btn>
        <v-btn color="green darken-1" text :loading="finishLoading" @click="finish">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInFinish',
  data: () => ({
    finishDialog: false,
    finishLoading: false,
    stockInId: ''
  }),
  methods: {
    init(id) {
      this.stockInId = id
      this.finishLoading = false
      this.finishDialog = true
    },

    // 确认入库单完成
    finish() {
      this.$nextTick(() => {
        this.finishDialog = true
      })
      let vm = this

      stockIn.confirm({ id: this.stockInId }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库单已确认')
          vm.$emit('close')
          vm.finishLoading = false
          vm.finishDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.finishLoading = false
        }
      })
    }
  }
}
</script>
