<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title> 冰块销售 </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <v-menu v-model="saleTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="iceSaleInfo.saleTime" label="销售日期" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="iceSaleInfo.saleTime" :day-format="$util.pickerDayFormat" @input="saleTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.iceType" label="冰块类型*" v-model="iceSaleInfo.iceType"></v-select>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <customer-select :customer-id.sync="iceSaleInfo.customerId"></customer-select>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-select
                :items="contractListData"
                label="选择合同*"
                :rules="contractRules"
                :hint="`${selectedContract.number}`"
                item-text="name"
                item-value="id"
                v-model="selectedContract"
                persistent-hint
                return-object
              ></v-select>
            </v-col>

            <v-col cols="4" md="4" sm="4">
              <v-text-field label="销售数量*" v-model="iceSaleInfo.saleCount" :rules="digitalRules" required></v-text-field>
            </v-col>

            <v-col cols="4" md="4" sm="4">
              <v-text-field label="单价*" v-model="iceSaleInfo.saleUnitPrice" :rules="priceRule" required></v-text-field>
            </v-col>

            <v-col cols="4" md="4" sm="4">
              <v-text-field label="总价*" v-model="saleFee" suffix="元" readonly></v-text-field>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" v-model="iceSaleInfo.remark"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="submitLoading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ice from '@/controllers/ice'
import contract from '@/controllers/contract'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'IceSaleCreate',
  components: {
    CustomerSelect
  },
  data: () => ({
    dialog: false,
    submitLoading: false,
    valid: true,
    saleTimeMenu: false,
    iceSaleInfo: {
      saleTime: null,
      flowNumber: '',
      customerId: 0,
      contractId: 0,
      iceType: 1,
      saleCount: 0,
      saleUnitPrice: 0.0,
      saleFee: 0.0,
      userId: 0,
      userName: '',
      remark: ''
    },
    selectedContract: { number: '' },
    contractListData: [],
    contractRules: [(v) => !!v.id || '请选择合同'],
    priceRule: [(v) => /^[0-9]+(.[0-9]{1,2})?$/.test(v) || '请输入正确费用'],
    digitalRules: [(v) => /^\d+$/.test(v) || '请输入数字']
  }),

  watch: {
    'iceSaleInfo.customerId': function (val) {
      this.loadContract(val)
    }
  },

  computed: {
    saleFee() {
      return (this.iceSaleInfo.saleCount * this.iceSaleInfo.saleUnitPrice).toFixed(2)
    }
  },

  methods: {
    init: function () {
      this.iceSaleInfo = {
        saleTime: this.$moment().format('YYYY-MM-DD'),
        flowNumber: '',
        customerId: 0,
        contractId: 0,
        iceType: 1,
        saleCount: 0,
        saleUnitPrice: 0,
        saleFee: 0,
        userId: 0,
        userName: '',
        remark: ''
      }
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    loadContract(customerId) {
      this.selectedContract = { number: '' }
      if (customerId == 0) {
        this.contractListData = []
        return
      }
      let vm = this
      contract.listByType(customerId, 4).then((res) => {
        vm.contractListData = res
        if (res.length > 0) {
          vm.selectedContract = res[0]
        }
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.submitLoading = true
        })

        let vm = this
        this.iceSaleInfo.userId = this.$store.state.user.id
        this.iceSaleInfo.userName = this.$store.state.user.name
        this.iceSaleInfo.contractId = this.selectedContract.id

        ice.addSale(this.iceSaleInfo).then((res) => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加冰块销售成功')
            vm.$emit('close')
            vm.submitLoading = false
            vm.dialog = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.submitLoading = false
          }
        })
      }
    }
  }
}
</script>
