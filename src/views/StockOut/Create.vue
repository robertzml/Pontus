<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <div class="title text--primary">货物信息</div>

        <v-container>
          <v-row dense>
            <v-col cols="6" md="4" sm="6">
              <v-menu v-model="stockOutTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="stockOutInfo.outTime" label="出库时间" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="stockOutInfo.outTime" :day-format="$util.pickerDayFormat" @input="stockOutTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="4" sm="6">
              <customer-select :customer-id.sync="stockOutInfo.customerId"></customer-select>
            </v-col>

            <v-col cols="6" md="4" sm="6">
              <v-select :items="contractListData" label="选择合同*" :rules="contractRules" :hint="`${selectedContract.number}`" item-text="name" item-value="id" v-model="selectedContract" persistent-hint return-object></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea label="备注" v-model="stockOutInfo.remark" rows="1" auto-grow></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-btn class="primary" @click="searchStore">搜索库存</v-btn>
      </v-card-text>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <store-view-list :store-list-data="storeListData"></store-view-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

    </v-form>
  </v-card>
</template>

<script>
import contract from '@/controllers/contract'
import store from '@/controllers/store'
import CustomerSelect from '@/components/Control/CustomerSelect'
import StoreViewList from '@/components/Grid/StoreViewList'

export default {
  name: 'StockOutCreate',
  components: {
    CustomerSelect,
    StoreViewList
  },
  data: () => ({
    valid: true,
    stockOutTimeMenu: false,
    stockOutInfo: {
      customerId: 0
    },
    selectedContract: { id: 0, number: '' },
    contractListData: [],
    contractRules: [v => !!v.id || '请选择合同'],
    storeListData: []
  }),
  watch: {
    'stockOutInfo.customerId': function(val) {
      this.loadContract(val)
    }
  },
  methods: {
    init: function() {
      this.$refs.form.resetValidation()
    },

    loadContract(customerId) {
      this.selectedContract = { number: '' }
      let vm = this
      contract.getList(customerId).then(res => {
        vm.contractListData = res
        if (res.length > 0) {
          vm.selectedContract = res[0]
        }
      })
    },

    searchStore() {
      if (this.selectedContract.id == 0) {
        return
      }

      let vm = this
      store.findByContract({ contractId: this.selectedContract.id, isStoreIn: true }).then(res => {
        vm.storeListData = res
      })
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>
