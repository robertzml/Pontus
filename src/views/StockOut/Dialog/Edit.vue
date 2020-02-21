<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        编辑出库单
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <v-menu
                v-model="stockOutTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
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
              <v-text-field label="客户" :value="`${stockOutInfo.customerNumber} - ${stockOutInfo.customerName}`" readonly></v-text-field>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-text-field
                label="所属合同"
                v-model="stockOutInfo.contractName"
                :hint="stockOutInfo.contractNumber"
                persistent-hint
                readonly
              ></v-text-field>
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
import stockOut from '@/controllers/stockOut'

export default {
  name: 'StockOutEdit',
  data: () => ({
    dialog: false,
    loading: false,
    valid: true,
    stockOutTimeMenu: false,
    stockOutId: '',
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
    }
  }),
  methods: {
    init(id) {
      this.stockOutId = id

      let vm = this
      stockOut.get(id).then(res => {
        vm.stockOutInfo = res
        vm.stockOutInfo.outTime = this.$moment(vm.stockOutInfo.outTime).format('YYYY-MM-DD')
      })

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
        this.stockOutInfo.userId = this.$store.state.user.id
        this.stockOutInfo.userName = this.$store.state.user.name

        stockOut.update(this.stockOutInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '编辑出库成功')
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
  }
}
</script>
