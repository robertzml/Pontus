<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md4>
        <v-card class="elevation-12">
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>用户登录</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field label="用户名" prepend-icon="person" type="text" v-model="loginUser.username" :rules="nameRules" required></v-text-field>

              <v-text-field label="密码" prepend-icon="lock" type="password" v-model="loginUser.password" :rules="passwordRules" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" block @click.stop="submit">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    valid: true,
    loginUser: {
      userName: '',
      password: ''
    },
    nameRules: [v => !!v || '请输入用户名'],
    passwordRules: [v => !!v || '请输入密码']
  }),
  methods: {
    ...mapActions(['login']),

    submit() {
      if (this.$refs.form.validate()) {
        this.login(this.loginUser)
      }
    }
  }
}
</script>
