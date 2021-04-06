<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">用户信息</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="6" md="6" sm="6">
                <v-text-field label="用户名*" v-model="userInfo.userName" :rules="userNameRules"></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="姓名*" v-model="userInfo.name" :rules="nameRules"></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="密码" v-model="userInfo.password" type="password" :rules="passwordRules"></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="密码确认" v-model="confirmPassword" type="password" :rules="confirmPasswordRules"></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-select :items="$dict.userGroup" label="用户组*" v-model="userInfo.userGroupId" :rules="userGroupRules"></v-select>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="备注" v-model="userInfo.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import user from '@/controllers/user'

export default {
  name: 'UserCreate',
  data: () => ({
    dialog: false,
    loading: false,
    valid: false,
    userInfo: {
      userName: '',
      userGroupId: 0,
      name: '',
      password: '',
      remark: ''
    },
    confirmPassword: '',
    userNameRules: [(v) => !!v || '请输入用户名'],
    nameRules: [(v) => !!v || '请输入姓名'],
    userGroupRules: [(v) => !!v || '请选择用户组'],
    passwordRules: [(v) => !!v || '请输入密码'],
    confirmPasswordRules: [(v) => !!v || '请输入密码']
  }),
  methods: {
    init() {
      this.loading = false
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this

        user.create(this.userInfo).then((res) => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加用户成功')
            vm.$emit('update')
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
