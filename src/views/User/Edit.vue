<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">用户信息</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="6" md="6" sm="6">
                <v-text-field label="用户名*" v-model="userInfo.userName"></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="姓名*" v-model="userInfo.name" readonly></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-select :items="$dict.userGroup" label="用户组*" v-model="userInfo.userGroupId" required></v-select>
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
  name: 'UserEdit',
  data: () => ({
    dialog: false,
    loading: false,
    valid: false,
    userId: 0,
    userInfo: {
      userName: '',
      userGroupId: 0,
      name: '',
      remark: ''
    }
  }),
  methods: {
    init(userId) {
      this.userId = userId

      if (userId != 0) {
        let vm = this
        user.get(userId).then(res => {
          vm.userInfo = res
        })
      }

      this.loading = false
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        if (this.userId == 0) {
        } else {
          user.update(this.userInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改用户信息成功')
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
}
</script>
