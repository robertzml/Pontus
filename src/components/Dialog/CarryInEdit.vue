<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="deep-orange">
        编辑搬运入库任务
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field label="托盘码*" v-model="carryInTask.trayCode" :readonly="carryInTask.type == 2" :rules="trayCodeRules"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="入库数量*" v-model="carryInTask.moveCount" :rules="moveCountRules"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="总重量" v-model="totalWeight" readonly :rules="moveWeightRules" suffix="吨"></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field label="备注" v-model="carryInTask.remark"></v-text-field>
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
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInEdit',
  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    carryInTask: {},
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    moveCountRules: [v => !!v || '请输入入库数量'],
    moveWeightRules: [v => !!v || '请输入入库重量']
  }),
  computed: {
    totalWeight: function() {
      return ((this.carryInTask.moveCount * this.carryInTask.unitWeight) / 1000).toFixed(4)
    }
  },
  methods: {
    init(id) {
      this.remark = ''
      this.dialog = true

      let vm = this
      carryIn.find(id).then(res => {
        vm.carryInTask = res
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
          id: this.carryInTask.id,
          userId: this.$store.state.user.id,
          storeId: this.carryInTask.storeId,
          trayCode: this.carryInTask.trayCode,
          moveCount: this.carryInTask.moveCount,
          moveWeight: this.totalWeight,
          remark: this.carryInTask.remark
        }

        carryIn.editTask(model).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '编辑入库成功')
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
