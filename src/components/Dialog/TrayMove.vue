<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title class="lime darken-4">
        托盘系统搬运
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field label="托盘码" v-model="trayCode" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="当前仓位码" v-model="positionInfo.number" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="目标仓位码" v-model="targetPosition" :rules="targetPositionRules"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="save">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import store from '@/controllers/store'

export default {
  name: 'TrayMove',
  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    positionInfo: {},
    trayCode: '',
    targetPosition: '',
    targetPositionRules: [v => !!v || '请输入仓位码', v => (v && v.length == 15) || '请输入正确仓位码']
  }),
  methods: {
    async init(pos) {
      this.dialog = true
      this.valid = false
      this.loading = false

      this.positionInfo = pos
      this.targetPosition = ''
      this.trayCode = await store.getPositionTray(this.positionInfo.id)

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
        let req = { positionId: this.positionInfo.id, targetPosition: this.targetPosition.toUpperCase(), userId: this.$store.state.user.id }
        store
          .moveTray(req)
          .then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '托盘移动成功')
              vm.loading = false
              vm.$emit('close')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
          .catch(() => {
            vm.loading = false
          })
      }
    }
  }
}
</script>
