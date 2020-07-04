<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>客户货品报表</v-toolbar-title>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="3">
                <customer-select :customer-id.sync="search.customerId" :required="true"></customer-select>
              </v-col>

              <v-col cols="3">
                <v-select
                  :items="contractListData"
                  label="选择合同*"
                  :rules="contractRules"
                  :hint="`${search.selectedContract.number}`"
                  item-text="name"
                  item-value="id"
                  v-model="search.selectedContract"
                  persistent-hint
                  return-object
                ></v-select>
              </v-col>

              <v-col cols="3">
                <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.date" label="库存日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.date" :day-format="$util.pickerDayFormat" @input="dateMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" @click="searchStore">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          货品库存列表
          <v-spacer></v-spacer>
          <v-text-field v-model="filter" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="storeListData" :items-per-page="10" :search="filter">
            <template v-slot:item.storageDate="{ item }">
              {{ item.storageDate | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import contract from '@/controllers/contract'
import statistic from '@/controllers/statistic'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StoreSnapshot',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: false,
    dateMenu: false,
    search: {
      customerId: 0,
      selectedContract: { number: '' },
      date: moment().format('YYYY-MM-DD')
    },
    filter: '',
    contractListData: [],
    contractRules: [v => !!v.id || '请选择合同'],
    storeListData: [],
    headers: [
      { text: '日期', value: 'storageDate' },
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' },
      { text: '类别代码', value: 'categoryNumber' },
      { text: '类别名称', value: 'categoryName' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '批次', value: 'batch' },
      { text: '在库数量', value: 'storeCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '在库重量(t)', value: 'storeWeight' }
    ]
  }),
  watch: {
    'search.customerId': function(val) {
      this.loadContract(val)
    }
  },
  methods: {
    // 载入合同
    async loadContract(customerId) {
      if (customerId) {
        this.contractListData = await contract.getList(customerId)
        if (this.contractListData.length > 0) {
          this.search.selectedContract = this.contractListData[0]
        }
      } else {
        this.contractListData = []
      }
    },

    // 搜索库存记录
    async searchStore() {
      if (this.$refs.form.validate()) {
        this.storeListData = await statistic.getCustomerCargoStore({ contractId: this.search.selectedContract.id, date: this.search.date })
      }
    }
  }
}
</script>
