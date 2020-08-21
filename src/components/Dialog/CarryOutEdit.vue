<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="deep-orange">
        编辑搬运出库任务
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field label="托盘码" v-model="carryOutTask.trayCode" readonly></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="在库数量" v-model="carryOutTask.storeCount" readonly></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="出库数量*" v-model="carryOutTask.moveCount" :rules="moveCountRules"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="总重量" v-model="totalWeight" readonly :rules="moveWeightRules" suffix="吨"></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field label="备注" v-model="carryOutTask.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="save">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import carryOut from '@/controllers/carryOut'

export default {
  name: 'CarryOutEdit',
  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    carryOutTask: {},
    moveCountRules: [v => !!v || '请输入出库数量'],
    moveWeightRules: [v => !!v || '请输入出库重量']
  }),
  computed: {
    totalWeight: function() {
      return ((this.carryOutTask.moveCount * this.carryOutTask.unitWeight) / 1000).toFixed(4)
    }
  },
  methods: {
    init(id) {
      this.remark = ''
      this.dialog = true

      let vm = this
      carryOut.find(id).then(res => {
        vm.carryOutTask = res
      })

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    save() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this

        let model = {
          id: this.carryOutTask.id,
          checkUserId: this.$store.state.user.id,
          storeId: this.carryOutTask.storeId,
          trayCode: this.carryOutTask.trayCode,
          moveCount: this.carryOutTask.moveCount,
          moveWeight: this.totalWeight,
          remark: this.carryOutTask.remark
        }

        carryOut.editTask(model).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '编辑出库成功')
            vm.loading = false
            vm.$emit('close')
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
