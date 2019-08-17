<template>
  <v-dialog v-model="dialog" persistent eager max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">客户信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="客户编号*" v-model="customerInfo.number" :rules="numberRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="客户名称*" v-model="customerInfo.name" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="地址" v-model="customerInfo.address"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="电话" v-model="customerInfo.telephone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="联系人" v-model="customerInfo.contact"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="联系人电话" v-model="customerInfo.contactTelephone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="customerType" label="客户类型*" v-model="customerInfo.type" required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md8>
                <v-text-field label="备注" v-model="customerInfo.remark"></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CustomerEdit',
  data: () => ({
    valid: true,
    dialog: false,
    customerId: 0,
    customerInfo: {
      number: '',
      name: '',
      address: '',
      telephone: '',
      contact: '',
      contactTelephone: '',
      type: 1,
      remark: ''
    },
    numberRules: [v => !!v || '请输入客户编号'],
    nameRules: [v => !!v || '请输入客户名称']
  }),
  computed: mapState({
    customerType: state => state.customerType
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
          type: 1,
          remark: ''
        }
      } else {
        let vm = this
        this.$store
          .dispatch('getCustomer', customerId)
          .then(res => {
            vm.customerInfo = res.data
          })
          .catch(err => {
            console.log(err)
            vm.alertError('载入失败')
          })
      }
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this
        if (this.customerId == 0) {
          this.$store
            .dispatch('createCustomer', this.customerInfo)
            .then(res => {
              vm.$store.commit('alertSuccess', '添加客户信息成功')
              vm.$emit('update')
              vm.dialog = false
            })
            .catch(err => {
              console.log(err)
              vm.$store.commit('alertError', '添加客户信息失败')
              vm.dialog = false
            })
        } else {
          this.$axios
            .post('/customer/update', this.customerInfo)
            .then(function(response) {
              vm.$store.commit('alertSuccess', '修改客户信息成功')
              vm.$emit('update')
              vm.dialog = false
            })
            .catch(function(error) {
              console.log(error)
              vm.$store.commit('alertError', '修改客户信息失败')
              vm.dialog = false
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
