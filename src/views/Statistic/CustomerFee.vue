<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>客户费用报表</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items> </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="3">
                <customer-select :customer-id.sync="search.customerId" :required="false"></customer-select>
              </v-col>

              <v-col cols="3">
                <v-menu v-model="startTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.startTime" label="开始日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.startTime" :day-format="$util.pickerDayFormat" @input="startTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu v-model="endTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.endTime" label="结束日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.endTime" :day-format="$util.pickerDayFormat" @input="endTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="searchCustomerFee">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          客户费用报表
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 mr-4">费用合计: {{ totalFee }} 元</span>
          <span class="text-subtitle-2 mr-4">期末合计: {{ totalEndDebt }} 元</span>
          <v-btn color="primary darken-1 ml-1" @click="exportList">导出Excel</v-btn>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="customerFeeHeader" :items="customerFeeData" :items-per-page="10">
            <template v-slot:[`item.startTime`]="{ item }">
              {{ item.startTime | displayDate }}
            </template>
            <template v-slot:[`item.endTime`]="{ item }">
              {{ item.endTime | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import statistic from '@/controllers/statistic'
import CustomerSelect from '@/components/Control/CustomerSelect'
import FileSaver from 'file-saver'
import Excel from 'exceljs'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

export default {
  name: 'StatisticCustomerFee',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: false,
    loading: false,
    startTimeMenu: false,
    endTimeMenu: false,
    search: {
      customerId: 0,
      startTime: null,
      endTime: null
    },
    customerFeeHeader: [
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '期初日期', value: 'startTime' },
      { text: '期末日期', value: 'endTime' },
      { text: '期初欠款(元)', value: 'startDebt' },
      { text: '基本费用(元)', value: 'baseFee' },
      { text: '冷藏费用(元)', value: 'coldFee' },
      { text: '其它费用(元)', value: 'miscFee' },
      { text: '费用合计(元)', value: 'totalFee' },
      { text: '回收款(元)', value: 'receiveFee' },
      { text: '折扣(元)', value: 'discount' },
      { text: '期末欠款(元)', value: 'endDebt' }
    ],
    customerFeeData: []
  }),
  computed: {
    // 费用合计
    totalFee: function () {
      let total = 0
      this.customerFeeData.forEach((r) => {
        total = total + r.totalFee
      })

      return total.toFixed(3)
    },
    // 期末欠款合计
    totalEndDebt: function () {
      let total = 0
      this.customerFeeData.forEach((r) => {
        total = total + r.endDebt
      })

      return total.toFixed(3)
    }
  },
  methods: {
    searchCustomerFee() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })
        let vm = this

        let model = {
          customerId: this.search.customerId,
          startTime: this.search.startTime,
          endTime: this.search.endTime
        }

        statistic.getCustomerFee(model).then((res) => {
          vm.customerFeeData = res
          vm.loading = false
        })
      }
    },

    exportList() {
      let workbook = new Excel.Workbook()

      let sheet = workbook.addWorksheet('客户货品报表')

      sheet.columns = [
        { header: '客户代码', key: 'customerNumber', width: 12 },
        { header: '客户名称', key: 'customerName', width: 20 },
        { header: '期初日期', key: 'startTime', width: 12 },
        { header: '期末日期', key: 'endTime', width: 12 },
        { header: '期初欠款(元)', key: 'startDebt', width: 12 },
        { header: '基本费用(元)', key: 'baseFee', width: 12 },
        { header: '冷藏费用(元)', key: 'coldFee', width: 12 },
        { header: '其它费用(元)', key: 'miscFee', width: 12 },
        { header: '费用合计(元)', key: 'totalFee', width: 12 },
        { header: '回收款(元)', key: 'receiveFee', width: 12 },
        { header: '折扣(元)', key: 'discount', width: 12 },
        { header: '期末欠款(元)', key: 'endDebt', width: 12 }
      ]

      this.customerFeeData.forEach((item) => {
        let info = {
          customerNumber: item.customerNumber,
          customerName: item.customerName,

          startTime: this.$util.displayDate(item.startTime),
          endTime: this.$util.displayDate(item.endTime),

          startDebt: item.startDebt,
          baseFee: item.baseFee,
          coldFee: item.coldFee,
          miscFee: item.miscFee,

          totalFee: item.totalFee,
          receiveFee: item.receiveFee,
          discount: item.discount,
          endDebt: item.endDebt
        }

        sheet.addRow(info)
      })

      sheet.eachRow(function (row) {
        row.eachCell(function (cell) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        })
      })

      let filename = '客户费用报表.xlsx'

      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: EXCEL_TYPE })
        FileSaver.saveAs(blob, filename)
      })
    }
  },
  mounted: function () {
    this.search.startTime = this.$moment().startOf('month').format('YYYY-MM-DD')
    this.search.endTime = this.$moment().format('YYYY-MM-DD')
  }
}
</script>
