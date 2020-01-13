<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        新建入库单
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <v-menu
                v-model="stockInTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="stockInInfo.inTime" label="入库时间" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="stockInInfo.inTime" :day-format="$util.pickerDayFormat" @input="stockInTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.stockInType" label="入库类型*" v-model="stockInInfo.type"></v-select>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <customer-select :customer-id.sync="stockInInfo.customerId"></customer-select>
            </v-col>

            <v-col cols="12" md="6" sm="6">
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

            <v-col cols="12" md="12" sm="12">
              <v-text-field label="备注" v-model="stockInInfo.remark"></v-text-field>
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
import stockIn from '@/controllers/stockIn'
import contract from '@/controllers/contract'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StockInCreate',
  components: {
    CustomerSelect
  },
  data: () => ({
    dialog: false,
    submitLoading: false,
    valid: true,
    stockInTimeMenu: false,
    stockInInfo: {
      inTime: null,
      monthTime: '',
      flowNumber: '',
      type: 1,
      customerId: 0,
      contractId: 0,
      userId: 0,
      userName: '',
      remark: ''
    },
    selectedContract: { number: '' },
    contractListData: [],
    contractRules: [v => !!v.id || '请选择合同']
  }),
  watch: {
    'stockInInfo.customerId': function(val) {
      this.loadContract(val)
    }
  },
  methods: {
    init: function() {
      this.stockInInfo = {
        inTime: this.$moment().format('YYYY-MM-DD'),
        monthTime: '',
        flowNumber: '',
        type: 1,
        customerId: 0,
        contractId: 0,
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
      contract.getList(customerId).then(res => {
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
        this.stockInInfo.contractId = this.selectedContract.id
        this.stockInInfo.userId = this.$store.state.user.id
        this.stockInInfo.userName = this.$store.state.user.name

        stockIn.create(this.stockInInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加入库成功')
            vm.$emit('close', res.entity.id, true)
            vm.submitLoading = false
            vm.dialog = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.submitLoading = false
          }
        })
      }
    }
  },
  mounted: function() {
    // this.init()
  }
}
</script>
