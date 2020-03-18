<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="cyan">
        编辑出库货物
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row dense>
              <v-col cols="4" md="4">
                <v-text-field label="货品名称" v-model="stockOutTaskInfo.cargoName" readonly></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field label="在库数量" v-model="stockOutTaskInfo.storeCount" readonly></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field label="出库数量" v-model="stockOutTaskInfo.outCount" :rules="digitRules"></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field label="单位重量" v-model="stockOutTaskInfo.unitWeight" readonly suffix="千克"></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field label="在库重量" v-model="stockOutTaskInfo.storeWeight" suffix="吨" readonly></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field label="出库重量" :value="stockOutTaskInfo.outWeight" suffix="吨" readonly></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field label="备注" v-model="stockOutTaskInfo.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="saveTask">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import stockOut from '@/controllers/stockOut'

export default {
  name: 'StockOutTaskEdit',
  data: () => ({
    dialog: false,
    valid: true,
    loading: false,
    taskId: '',
    stockOutTaskInfo: {},
    digitRules: [v => (v != null && /^\d+$/.test(v)) || '请输入数字']
  }),
  watch: {
    'stockOutTaskInfo.outCount': function(val) {
      this.stockOutTaskInfo.outWeight = ((val * this.stockOutTaskInfo.unitWeight) / 1000).toFixed(4)
    }
  },
  methods: {
    init(id) {
      this.dialog = true
      this.loading = false
      this.taskId = id

      this.loadStockOutTask()

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    // 载入出库任务
    async loadStockOutTask() {
      this.stockOutTaskInfo = await stockOut.getTask(this.taskId)
    },

    saveTask() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this

        stockOut.editTask(this.stockOutTaskInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '编辑任务成功')
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
}
</script>
