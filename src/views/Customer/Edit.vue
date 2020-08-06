<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">客户信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="客户编号*" v-model="customerInfo.number" :rules="numberRules" required></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="客户名称*" v-model="customerInfo.name" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="地址" v-model="customerInfo.address"></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="电话" v-model="customerInfo.telephone"></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="联系人" v-model="customerInfo.contact"></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="联系人电话" v-model="customerInfo.contactTelephone"></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="身份证号" v-model="customerInfo.identityCard"></v-text-field>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-select :items="$dict.customerType" label="客户类型*" v-model="customerInfo.type" required></v-select>
            </v-col>
            <v-col cols="3" md="3" sm="6">
              <v-text-field label="备注" v-model="customerInfo.remark"></v-text-field>
            </v-col>
          </v-row>
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
import customer from '@/controllers/customer'

export default {
  name: 'CustomerEdit',
  data: () => ({
    valid: true,
    loading: false,
    dialog: false,
    customerId: 0,
    customerInfo: {
      number: '',
      name: '',
      address: '',
      telephone: '',
      contact: '',
      contactTelephone: '',
      identityCard: '',
      type: 1,
      remark: ''
    },
    numberRules: [v => !!v || '请输入客户编号'],
    nameRules: [v => !!v || '请输入客户名称']
  }),
  methods: {
    init(customerId) {
      this.customerId = customerId
      if (customerId == 0) {
        this.customerInfo = {
          number: '',
          name: '',
          address: '',
          telephone: '',
          contact: '',
          contactTelephone: '',
          identityCard: '',
          type: 1,
          remark: ''
        }
      } else {
        let vm = this
        customer.find(customerId).then(res => {
          vm.customerInfo = res
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
        if (this.customerId == 0) {
          customer.create(this.customerInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加客户信息成功')
              vm.$emit('update')
              vm.loading = false
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        } else {
          customer.update(this.customerInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改客户信息成功')
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
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
