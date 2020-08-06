<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card>
      <v-card-title class="headline">撤回入库单</v-card-title>
      <v-card-text>是否确认撤回该入库单？ <br />流水单号: {{ stockInInfo.flowNumber }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text :loading="loading" @click="revert">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInRevert',
  data: () => ({
    dialog: false,
    loading: false,
    stockInId: '',
    stockInInfo: {}
  }),
  methods: {
    init(id) {
      this.stockInId = id
      this.loadInfo()
      this.loading = false
      this.dialog = true
    },

    async loadInfo() {
      this.stockInInfo = await stockIn.find(this.stockInId)
    },

    // 撤回入库单
    revert() {
      let vm = this
      this.$nextTick(() => {
        this.loading = true
      })

      stockIn.revert({ id: this.stockInId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库单已撤回')
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
