<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
          <v-card-text class="pt-0">
            <v-row dense>
              <v-col cols="3" md="3" sm="6">
                <customer-select :customer-id.sync="filter.customerId" :required="false"></customer-select>
              </v-col>

              <v-col cols="3" md="3" sm="6">
                <v-select :items="$dict.paidType" label="缴费方式" v-model="filter.paidType" clearable></v-select>
              </v-col>

              <v-col cols="3" md="3" sm="6">
                <v-menu v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="filter.time" label="缴费日期" prepend-icon="event" clearable hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="filter.time" :day-format="$util.pickerDayFormat" @input="timeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="filter.text" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title class="orange">
            缴费列表
            <v-spacer></v-spacer>
            <span class="text-subtitle-2 ml-4">缴费总记录: {{ paymentFilterData.length }} 条</span>
            <span class="text-subtitle-2 ml-4">缴费总金额: {{ totalFee }} 元</span>
            <v-btn color="primary darken-1 ml-1" @click="exportList">导出Excel</v-btn>
          </v-card-title>
          <v-card-text class="px-0">
            <v-data-table :headers="headers" :items="paymentFilterData" :search="filter.text" :items-per-page="10">
              <template v-slot:[`item.paidType`]="{ item }">
                {{ item.paidType | paidType }}
              </template>
              <template v-slot:[`item.paidTime`]="{ item }">
                {{ item.paidTime | displayDate }}
              </template>
              <template v-slot:[`item.createTime`]="{ item }">
                {{ item.createTime | displayDateTime }}
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn small color="success" @click="viewItem(item)">
                  <v-icon left dark>pageview</v-icon>
                  查看
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import payment from '@/controllers/payment'
import CustomerSelect from '@/components/Control/CustomerSelect'
import FileSaver from 'file-saver'
import Excel from 'exceljs'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

export default {
  name: 'PaymentList',
  components: {
    CustomerSelect
  },
  data: () => ({
    timeMenu: false,
    filter: {
      paidType: 0,
      customerId: 0,
      time: null,
      text: ''
    },
    paymentListData: [],
    headers: [
      { text: '票号', value: 'ticketNumber', align: 'left' },
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '缴费金额(元)', value: 'paidFee' },
      { text: '缴费日期', value: 'paidTime' },
      { text: '缴费方式', value: 'paidType' },
      { text: '登记人', value: 'userName' },
      { text: '登记时间', value: 'createTime' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: (state) => state.payment.refreshEvent
    }),
    // 过滤后缴费列表
    paymentFilterData() {
      let temp = this.paymentListData

      if (this.filter.customerId != 0) {
        temp = temp.filter((r) => r.customerId == this.filter.customerId)
      }

      if (this.filter.paidType) {
        temp = temp.filter((r) => r.paidType == this.filter.paidType)
      }

      if (this.filter.time) {
        let t = this.$moment(this.filter.time)
        temp = temp.filter((r) => t.isSame(r.paidTime))
      }

      return temp
    },

    // 缴费总金额
    totalFee: function () {
      return this.paymentFilterData
        .reduce(function (acc, cur) {
          return acc + cur.paidFee
        }, 0.0)
        .toFixed(3)
    }
  },
  watch: {
    refreshEvent: function () {
      this.loadList()
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'payment/showDetails'
    }),

    async loadList() {
      this.paymentListData = await payment.getList()
    },
    viewItem(item) {
      this.showDetails(item.id)
    },

    exportList() {
      let workbook = new Excel.Workbook()

      let sheet = workbook.addWorksheet('缴费列表')

      sheet.columns = [
        { header: '票号', key: 'ticketNumber', width: 16 },
        { header: '客户代码', key: 'customerNumber', width: 12 },
        { header: '客户名称', key: 'customerName', width: 20 },
        { header: '缴费金额(元)', key: 'paidFee', width: 12 },
        { header: '缴费日期', key: 'paidTime', width: 12 },
        { header: '缴费方式', key: 'paidType', width: 12 },
        { header: '登记人', key: 'userName', width: 12 },
        { header: '登记时间', key: 'createTime', width: 12 },
        { header: '备注', key: 'remark', width: 12 }
      ]

      this.paymentListData.forEach((item) => {
        let info = {
          ticketNumber: item.ticketNumber,
          customerNumber: item.customerNumber,
          customerName: item.customerName,
          paidFee: item.paidFee,
          paidTime: this.$util.displayDate(item.paidTime),
          paidType: this.$util.paidType(item.paidType),
          userName: item.userName,
          createTime: this.$util.displayDate(item.createTime),
          remark: item.remark
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

      let filename = '缴费列表.xlsx'

      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: EXCEL_TYPE })
        FileSaver.saveAs(blob, filename)
      })
    }
  },
  activated: function () {
    this.loadList()
  }
}
</script>
