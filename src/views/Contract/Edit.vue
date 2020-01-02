<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">合同信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="合同编号" v-model="contractInfo.number" hint="自动生成" persistent-hint readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="合同名称*" v-model="contractInfo.name" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <customer-select :customer-id.sync="contractInfo.customerId"></customer-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.contractType" label="合同类型*" v-model="contractInfo.type" required></v-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-menu
                v-model="signDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="contractInfo.signDate" label="签订日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="contractInfo.signDate" :day-format="dayFormat" @input="signDateMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-menu
                v-model="closeDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="contractInfo.closeDate" label="关闭日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="contractInfo.closeDate" :day-format="dayFormat" @input="closeDateMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.billingType" label="计费方式*" v-model="contractInfo.billingType" required></v-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field
                label="冷藏费单价*"
                prefix="¥"
                :suffix="$util.billingTypeUnit(contractInfo.billingType)"
                v-model="contractInfo.unitPrice"
                :rules="priceRule"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="最短天数" v-model="contractInfo.parameter1"></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field label="备注" v-model="contractInfo.remark"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
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
import sequence from '@/controllers/sequence'
import contract from '@/controllers/contract'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'ContractEdit',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: true,
    dialog: false,
    signDateMenu: false,
    closeDateMenu: false,
    contractId: 0,
    contractInfo: {
      number: '',
      name: '',
      customerId: 0,
      type: 1,
      signDate: '',
      closeDate: '',
      billingType: 1,
      unitPrice: 0,
      remark: ''
    },
    nameRules: [v => !!v || '请输入合同名称'],
    priceRule: [v => /^[0-9]+(.[0-9]{1,2})?$/.test(v) || '请输入正确冷藏费']
  }),
  methods: {
    init: function(id) {
      this.contractId = id
      if (this.contractId == 0) {
        this.contractInfo = {
          number: '',
          name: '',
          customerId: 0,
          type: 1,
          signDate: '',
          closeDate: '',
          billingType: 1,
          unitPrice: 0,
          remark: ''
        }
      } else {
        let vm = this
        contract.get(id).then(res => {
          vm.contractInfo = res
          vm.contractInfo.signDate = vm.contractInfo.signDate.substr(0, 10)
          if (vm.contractInfo.closeDate != null && vm.contractInfo.closeDate != '') {
            vm.contractInfo.closeDate = vm.contractInfo.closeDate.substr(0, 10)
          }
        })
      }

      this.dialog = true
      this.$refs.form.resetValidation()
    },

    dayFormat: function(val) {
      if (val != null || val != undefined) {
        let date = new Date(val)
        return date.getDate()
      } else {
        return ''
      }
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this
        this.contractInfo.userId = this.$store.state.user.id
        this.contractInfo.userName = this.$store.state.user.name

        if (this.contractId == 0) {
          contract.create(this.contractInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加合同成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        } else {
          contract.update(this.contractInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改合同成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        }
      }
    }
  }
}
</script>
