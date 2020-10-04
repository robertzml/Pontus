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

              <v-col cols="2">
                <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.date" label="库存日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.date" :day-format="$util.pickerDayFormat" @input="dateMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="1">
                <v-checkbox v-model="search.groupByBatch" label="按批次分组"></v-checkbox>
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
          <span class="text-subtitle-2 mr-4">在库总数量: {{ totalStoreCount }} </span>
          <span class="text-subtitle-2 mr-4">在库总重量: {{ totalStoreWeight }} 吨</span>
          <span class="text-subtitle-2 mr-4">资产总价格: {{ totalAssetAmount }} 元</span>
          <v-btn color="primary darken-1 ml-1" @click="exportList">导出Excel</v-btn>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="storeListData" :items-per-page="10">
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
import FileSaver from 'file-saver'
import Excel from 'exceljs'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

export default {
  name: 'CustomerCargoStore',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: false,
    dateMenu: false,
    search: {
      customerId: 0,
      selectedContract: { number: '' },
      date: moment().format('YYYY-MM-DD'),
      groupByBatch: false
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
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '资产价格(元)', value: 'assetAmount' }
    ]
  }),
  watch: {
    'search.customerId': function(val) {
      this.loadContract(val)
    }
  },
  computed: {
    totalStoreCount: function() {
      let total = 0
      this.storeListData.forEach(r => {
        total = total + r.storeCount
      })

      return total
    },

    totalStoreWeight: function() {
      let total = 0
      this.storeListData.forEach(r => {
        total = total + r.storeWeight
      })

      return total
    },

    totalAssetAmount: function() {
      let total = 0
      this.storeListData.forEach(r => {
        total = total + r.assetAmount
      })

      return total
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
        this.storeListData = await statistic.getCustomerCargoStore({
          contractId: this.search.selectedContract.id,
          date: this.search.date,
          groupByBatch: this.search.groupByBatch
        })
      }
    },

    exportList() {
      let workbook = new Excel.Workbook()

      let sheet = workbook.addWorksheet('客户货品报表')

      sheet.columns = [
        { header: '日期', key: 'storageDate', width: 12 },
        { header: '客户代码', key: 'customerNumber', width: 10 },
        { header: '客户名称', key: 'customerName', width: 20 },
        { header: '合同名称', key: 'contractName', width: 18 },
        { header: '类别代码', key: 'categoryNumber', width: 10 },
        { header: '类别名称', key: 'categoryName', width: 15 },
        { header: '货品名称', key: 'cargoName', width: 15 },
        { header: '规格', key: 'specification', width: 10 },
        { header: '批次', key: 'batch', width: 10 },
        { header: '在库数量', key: 'storeCount', width: 10 },
        { header: '单位重量(kg)', key: 'unitWeight', width: 12 },
        { header: '在库重量(t)', key: 'storeWeight', width: 12 }
      ]

      this.storeListData.forEach(item => {
        let info = {
          storageDate: this.$util.displayDate(item.storageDate),
          customerNumber: item.customerNumber,
          customerName: item.customerName,
          contractName: item.contractName,
          categoryNumber: item.categoryNumber,
          categoryName: item.categoryName,
          cargoName: item.cargoName,
          specification: item.specification,
          batch: item.batch,
          storeCount: item.storeCount,
          unitWeight: item.unitWeight,
          storeWeight: item.storeWeight
        }

        sheet.addRow(info)
      })

      sheet.eachRow(function(row) {
        row.eachCell(function(cell) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        })
      })

      let filename = '客户货品报表.xlsx'
      if (this.storeListData.length > 0) {
        filename = '客户货品报表-' + this.storeListData[0].customerName + '.xlsx'
      }

      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], { type: EXCEL_TYPE })
        FileSaver.saveAs(blob, filename)
      })
    }
  }
}
</script>
