<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          仓位库入库
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs6 md6>
                <v-menu v-model="stockInTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="stockInInfo.inTime" label="入库时间" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="stockInInfo.inTime" :day-format="$util.pickerDayFormat" @input="stockInTimeMenu = false" @change="selectStockInTime"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md3>
                <v-text-field label="入库月份" v-model="stockInInfo.monthTime" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md6>
                <customer-select :customer-id.sync="stockInInfo.customerId"></customer-select>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-select :items="contractListData" label="选择合同*" :hint="`${selectedContract.number}`" item-text="name" item-value="id" v-model="selectedContract" persistent-hint return-object></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import contract from '@/controllers/contract'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StockInCreatePosition',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: true,
    stockInTimeMenu: false,
    stockInInfo: {
      inTime: null,
      monthTime: '',
      flowNumber: '',
      type: 0,
      customerId: 0,
      contractId: 0,
      userId: 0,
      userName: '',
      remark: ''
    },
    selectedContract: { number: '' },
    contractListData: []
  }),
  watch: {
    'stockInInfo.customerId': function(val) {
      this.loadContract(val)
    }
  },
  methods: {
    init: function() {
      this.stockInInfo.inTime = new Date().toISOString().substr(0, 10)
      this.$refs.form.resetValidation()
    },
    selectStockInTime(val) {
      console.log(val)
    },

    loadContract(customerId) {
      this.selectedContract = { number: '' }
      let vm = this
      contract.getList(customerId).then(res => {
        vm.contractListData = res
      })
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>
