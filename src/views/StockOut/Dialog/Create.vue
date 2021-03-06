<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title> 新建出库单 </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="6" md="6" sm="6">
              <v-menu v-model="stockOutTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="stockOutInfo.outTime" label="出库时间" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="stockOutInfo.outTime" :day-format="$util.pickerDayFormat" @input="stockOutTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.stockOutType" label="出库类型*" v-model="stockOutInfo.type"></v-select>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <customer-select :customer-id.sync="stockOutInfo.customerId"></customer-select>
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

            <v-col cols="6" md="6" sm="6">
              <v-text-field label="车牌号" v-model="stockOutInfo.vehicleNumber"></v-text-field>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" v-model="stockOutInfo.remark"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import contract from '@/controllers/contract'
import stockOut from '@/controllers/stockOut'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StockOutCreate',
  components: {
    CustomerSelect
  },
  data: () => ({
    dialog: false,
    loading: false,
    valid: false,
    stockOutTimeMenu: false,
    stockOutInfo: {
      outTime: null,
      monthTime: '',
      flowNumber: '',
      type: 1,
      customerId: 0,
      contractId: 0,
      vehicleNumber: '',
      userId: 0,
      userName: '',
      remark: ''
    },
    selectedContract: { id: 0, number: '' },
    contractListData: [],
    contractRules: [(v) => !!v.id || '请选择合同']
  }),
  watch: {
    'stockOutInfo.customerId': function (val) {
      this.loadContract(val)
    }
  },
  methods: {
    init: function () {
      this.stockOutInfo = {
        outTime: this.$moment().format('YYYY-MM-DD'),
        monthTime: '',
        flowNumber: '',
        type: 1,
        customerId: 0,
        contractId: 0,
        vehicleNumber: '',
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
      contract.getList(customerId).then((res) => {
        vm.contractListData = res
        if (res.length > 0) {
          vm.selectedContract = res[0]
        }
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        if (this.stockOutInfo.type == 3 && this.selectedContract.type != 3) {
          this.$store.commit('alertError', '冷冻库出库请使用冷冻合同')
          this.loading = false
          return
        }

        if (this.stockOutInfo.type != 3 && this.selectedContract.type == 3) {
          this.$store.commit('alertError', '冷冻库出库请使用冷冻合同')
          this.loading = false
          return
        }

        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        this.stockOutInfo.contractId = this.selectedContract.id
        this.stockOutInfo.userId = this.$store.state.user.id
        this.stockOutInfo.userName = this.$store.state.user.name

        stockOut.create(this.stockOutInfo).then((res) => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加出库成功')
            vm.$emit('close')
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
  mounted: function () {}
}
</script>
