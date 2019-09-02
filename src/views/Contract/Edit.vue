<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">合同信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="合同编号*" v-model="contractInfo.number" :rules="numberRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="合同名称*" v-model="contractInfo.name" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="所属客户" v-model="contractInfo.customerId"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="合同类型" v-model="contractInfo.type"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu v-model="signDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="contractInfo.signDate" label="签订日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="contractInfo.signDate" @input="signDateMenu = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="关闭日期" v-model="contractInfo.closeDate"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="$dict.customerType" label="客户类型*" v-model="contractInfo.type" required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md8>
                <v-text-field label="备注" v-model="contractInfo.remark"></v-text-field>
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
export default {
  name: 'ContractEdit',
  data: () => ({
    valid: true,
    dialog: false,
    signDateMenu: false,
    contractId: 0,
    contractInfo: {
      number: '',
      name: '',
      customerId: 0,
      type: 1,
      signDate: '',
      closeDate: '',
      billingType: 0,
      unitPrice: 0,
      remark: ''
    },
    numberRules: [v => !!v || '请输入合同编号'],
    nameRules: [v => !!v || '请输入合同名称']
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
          billingType: 0,
          unitPrice: 0,
          remark: ''
        }
      } else {
        let vm = this
        this.$store.dispatch('getContract', id).then(res => {
          vm.contractInfo = res
          vm.contractInfo.signDate = vm.contractInfo.signDate.substr(0, 10)
        })
      }

      this.dialog = true
      this.$refs.form.resetValidation()
    },

    submit() {}
  }
}
</script>
