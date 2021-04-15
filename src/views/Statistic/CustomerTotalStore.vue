<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>客户库存日报表</v-toolbar-title>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
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
          客户库存列表
          <v-spacer></v-spacer>
          <v-text-field v-model="filter" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
          <v-btn color="primary darken-1 ml-1" @click="exportList">导出Excel</v-btn>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="storeListData" :items-per-page="10" :search="filter">
            <template v-slot:[`item.storageDate`]="{ item }">
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
import statistic from '@/controllers/statistic'
import FileSaver from 'file-saver'
import Excel from 'exceljs'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

export default {
  name: 'CustomerTotalStore',
  data: () => ({
    valid: false,
    dateMenu: false,
    search: {
      date: moment().format('YYYY-MM-DD')
    },
    filter: '',
    contractListData: [],
    storeListData: [],
    headers: [
      { text: '日期', value: 'storageDate' },
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '在库数量', value: 'totalCount' },
      { text: '在库重量(t)', value: 'totalWeight' }
    ]
  }),
  methods: {
    // 搜索库存记录
    async searchStore() {
      if (this.$refs.form.validate()) {
        this.storeListData = await statistic.getCustomerTotalStore(this.search.date)
      }
    },

    exportList() {
      let workbook = new Excel.Workbook()

      let sheet = workbook.addWorksheet('客户库存日报表')

      sheet.columns = [
        { header: '日期', key: 'storageDate', width: 12 },
        { header: '客户代码', key: 'customerNumber', width: 10 },
        { header: '客户名称', key: 'customerName', width: 20 },
        { header: '在库数量', key: 'totalCount', width: 10 },
        { header: '在库重量(t)', key: 'totalWeight', width: 12 }
      ]

      this.storeListData.forEach((item) => {
        let info = {
          storageDate: this.$util.displayDate(item.storageDate),
          customerNumber: item.customerNumber,
          customerName: item.customerName,
          totalCount: item.totalCount,
          totalWeight: item.totalWeight
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

      let filename = '客户库存日报表.xlsx'

      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: EXCEL_TYPE })
        FileSaver.saveAs(blob, filename)
      })
    }
  }
}
</script>
