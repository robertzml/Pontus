<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title class="lime darken-4">
        下发搬运入库任务
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field label="托盘码*" v-model="carryInInfo.trayCode" :counter="6" :rules="trayCodeRules"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="入库数量*" v-model="carryInInfo.moveCount" :rules="numberRules"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="总重量*" v-model="totalWeight" suffix="吨" readonly></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field label="备注" v-model="carryInInfo.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="addTask">添加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInCreate',
  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    stockInTask: {},
    carryInInfo: {
      trayCode: '',
      moveCount: 0,
      moveWeight: 0.0,
      remark: ''
    },
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    numberRules: [v => /^\d+$/.test(v) || '请输入数字']
  }),
  computed: {
    totalWeight: function() {
      return ((this.carryInInfo.moveCount * this.stockInTask.unitWeight) / 1000).toFixed(4)
    }
  },
  methods: {
    init(task) {
      this.stockInTask = task
      this.clearTask()
      this.dialog = true

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    clearTask() {
      this.carryInInfo = {
        trayCode: '',
        moveCount: 0,
        moveWeight: 0.0,
        remark: ''
      }
    },

    // 添加搬运入库
    addTask() {
      if (this.$refs.form.validate()) {
        if (this.carryInInfo.moveCount <= 0) {
          this.$store.commit('alertError', '请输入正确搬运数量')
          return
        }

        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this

        this.carryInInfo.stockInTaskId = this.stockInTask.id
        this.carryInInfo.moveWeight = this.totalWeight
        this.carryInInfo.checkUserId = this.$store.state.user.id

        carryIn.create(this.carryInInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加任务成功')
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
