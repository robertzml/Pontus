<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">托盘上架</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field label="托盘码" prepend-icon="power_input" autocomplete="off" :value="trayCode" readonly></v-text-field>

          <v-text-field label="货架码" prepend-icon="border_all" v-model="shelfCode" :counter="12" :rules="shelfCodeRules" autofocus></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="green darken-1" text :loading="loading" :disabled="!valid" @click="enterTask">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInEnter',
  data: () => ({
    dialog: false,
    valid: false,
    loading: false,
    trayCode: '',
    shelfCode: '',
    shelfCodeRules: [v => !!v || '请输入货架码', v => (v && v.length == 12) || '请输入正确货架码']
  }),
  methods: {
    init(trayCode) {
      this.shelfCode = ''
      this.trayCode = trayCode
      this.dialog = true

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    // 上架
    enterTask() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        let req = { trayCode: this.trayCode, shelfCode: this.shelfCode.toUpperCase(), userId: this.$store.state.user.id }
        carryIn.enterTask(req).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '入库上架成功')
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
