<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        设置入库费用
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense v-for="item in billingItems" :key="item.code">
            <v-col cols="3" md="3" sm="3">
              <v-text-field label="费用项目" :value="`${item.code} - ${item.name}`" readonly></v-text-field>
            </v-col>

            <v-col v-if="item.type == 2" cols="3" md="3" sm="3">
              <v-text-field label="单价" suffix="元/吨" :rules="numberRules" v-model="item.unitPrice" @input="editUnit(item)"></v-text-field>
            </v-col>

            <v-col v-if="item.type == 2" cols="3" md="3" sm="3">
              <v-text-field label="数量" suffix="吨" v-model="item.count"></v-text-field>
            </v-col>

            <v-col cols="3" md="3" sm="3">
              <v-text-field label="总价" suffix="元" :rules="numberRules" v-model="item.amount"></v-text-field>
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
import stockIn from '@/controllers/stockIn'
import expenseItem from '@/controllers/expenseItem'

export default {
  name: 'StockInEditBilling',
  data: () => ({
    valid: true,
    dialog: false,
    loading: false,
    expenseItems: [],
    billingItems: [],
    stockInId: '',
    stockInTaskList: [],
    numberRules: [v => (v != null && /^[0-9]+(.[0-9]{1,3})?$/.test(v)) || '请输入数字，最多3位小数']
  }),
  computed: {
    totalWeight: function() {
      let total = 0
      this.stockInTaskList.forEach(item => {
        total += item.inWeight
      })

      return total.toFixed(3)
    }
  },
  methods: {
    init(stockInId) {
      this.stockInId = stockInId

      this.getTaskList()
      this.billingItems = []
      this.setBillingItems()

      this.loading = false
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    async getTaskList() {
      this.stockInTaskList = await stockIn.getTaskList(this.stockInId)
    },

    async setBillingItems() {
      this.billingItems = await stockIn.getBilling(this.stockInId)

      let exp = await expenseItem.getList()
      this.expenseItems = exp.filter(r => r.type != 3)

      this.expenseItems.forEach(item => {
        if (this.billingItems.every(r => r.expenseItemId != item.id)) {
          let bill = {
            expenseItemId: item.id,
            code: item.code,
            name: item.name,
            type: item.type,
            unitPrice: 0,
            count: this.totalWeight,
            amount: 0
          }

          this.billingItems.push(bill)
        }
      })
    },

    // 修改单价
    editUnit(item) {
      if (item.type == 2) {
        item.amount = (item.unitPrice * item.count).toFixed(3)
      }
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this

        this.billingItems.forEach(item => {
          item.stockInId = this.stockInId
        })

        stockIn.setBilling(this.billingItems).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '设置费用成功')
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
