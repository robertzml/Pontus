<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="deep-orange">
        确认搬运入库任务
      </v-card-title>
      <v-alert type="info">
        确认后库存记录变为在库。临时搬运无法修改数量、重量。
      </v-alert>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field label="托盘码*" v-model="carryInTask.trayCode" :readonly="carryInTask.type == 2" :rules="trayCodeRules"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="入库数量*"
                  v-model="carryInTask.moveCount"
                  :readonly="carryInTask.type == 2"
                  :rules="moveCountRules"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="总重量*"
                  v-model="carryInTask.moveWeight"
                  :readonly="carryInTask.type == 2"
                  :rules="moveWeightRules"
                  suffix="吨"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="finish">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInFinish',
  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    carryInTask: {},
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    moveCountRules: [v => !!v || '请输入入库数量'],
    moveWeightRules: [v => !!v || '请输入入库重量']
  }),
  methods: {
    init(id) {
      this.remark = ''
      this.dialog = true

      let vm = this
      carryIn.get(id).then(res => {
        vm.carryInTask = res
      })

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    finish() {
      if (this.$refs.form.validate()) {
        let vm = this
        this.$nextTick(() => {
          this.loading = true
        })

        let model = {
          taskId: this.carryInTask.id,
          userId: this.$store.state.user.id,
          trayCode: this.carryInTask.trayCode,
          moveCount: this.carryInTask.moveCount,
          moveWeight: this.carryInTask.moveWeight
        }

        carryIn.finishTask(model).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '任务确认成功')
            vm.loading = false
            vm.$emit('close')
            vm.dialog = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            this.loading = false
          }
        })
      }
    }
  }
}
</script>
