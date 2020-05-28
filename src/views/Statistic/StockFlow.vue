<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>出入库报表</v-toolbar-title>
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
                <customer-select :customer-id.sync="search.customerId" :required="true"></customer-select>
              </v-col>

              <v-col cols="3">
                <v-menu
                  v-model="startTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.startTime" label="开始日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.startTime" :day-format="$util.pickerDayFormat" @input="startTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  v-model="endTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="search.endTime" label="结束日期" prepend-icon="event" hide-details readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="search.endTime" :day-format="$util.pickerDayFormat" @input="endTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="searchStockFlow">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="4">
              <v-select :items="$dict.flowType" label="流水类型" v-model="filter.flowType" clearable></v-select>
            </v-col>

            <v-col cols="4">
              <v-text-field v-model="filter.text" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          出入库列表
          <v-spacer></v-spacer>
          <span class="subtitle-2 mr-4">入库数量: {{ totalInCount }} </span>
          <span class="subtitle-2 mr-4">出库数量: {{ totalOutCount }} </span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="stockFlowHeader" :items="stockFlowFilterData" :search="filter.text" :items-per-page="10">
            <template v-slot:item.flowDate="{ item }">
              {{ item.flowDate | displayDate }}
            </template>
            <template v-slot:item.type="{ item }">
              {{ item.type | flowType }}
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

export default {
  name: 'StatisticStockFlow',
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
    filter: {
      flowType: 0,
      text: ''
    },
    stockFlowHeader: [
      { text: '流水日期', value: 'flowDate' },
      { text: '流水类型', value: 'type' },
      { text: '流水单号', value: 'flowNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' },
      { text: '类别代码', value: 'categoryNumber' },
      { text: '类别名称', value: 'categoryName' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '流水数量', value: 'flowCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '流水重量(t)', value: 'flowWeight' }
    ],
    stockFlowData: []
  }),
  computed: {
    // 过滤后列表
    stockFlowFilterData() {
      let temp = this.stockFlowData

      if (this.filter.flowType) {
        temp = temp.filter(r => r.type == this.filter.flowType)
      }

      return temp
    },

    totalInCount: function() {
      const inList = this.stockFlowData.filter(r => r.type == 1)

      let total = 0
      inList.forEach(r => {
        total = total + r.flowCount
      })

      return total
    },

    totalOutCount: function() {
      const outList = this.stockFlowData.filter(r => r.type == 2)

      let total = 0
      outList.forEach(r => {
        total = total + r.flowCount
      })

      return total
    }
  },
  methods: {
    searchStockFlow() {
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

        statistic.getCustomerStockFlow(model).then(res => {
          vm.stockFlowData = res
          vm.loading = false
        })
      }
    }
  },
  mounted: function() {
    this.search.startTime = this.$moment()
      .startOf('month')
      .format('YYYY-MM-DD')
    this.search.endTime = this.$moment().format('YYYY-MM-DD')
  }
}
</script>
