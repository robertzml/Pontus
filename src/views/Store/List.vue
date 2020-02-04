<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>库存列表</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle>
          筛选
        </v-card-subtitle>
        <v-card-text>
          <form>
            <v-row dense>
              <v-col cols="4" md="4" sm="4">
                <customer-select :customer-id.sync="filter.customerId" :required="false"></customer-select>
              </v-col>

              <v-col cols="4" md="4" sm="4">
                <v-menu
                  v-model="inTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="filter.time"
                      label="入库日期"
                      prepend-icon="event"
                      clearable
                      hide-details
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filter.time" :day-format="$util.pickerDayFormat" @input="inTimeMenu = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="4" md="4" sm="4">
                <v-text-field v-model="filter.text" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
              </v-col>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="orange">
          库存列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="storeData" :search="search" :items-per-page="10">
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.inTime="{ item }">
              {{ item.inTime | displayDate }}
            </template>
            <template v-slot:item.outTime="{ item }">
              {{ item.outTime | displayDate }}
            </template>
            <template v-slot:item.action="{ item }">
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
</template>

<script>
import store from '@/controllers/store'
import CustomerSelect from '@/components/Control/CustomerSelect'

export default {
  name: 'StoreList',
  components: {
    CustomerSelect
  },
  data: () => ({
    search: '',
    inTimeMenu: false,
    filter: {
      customerId: 0,
      time: null,
      text: ''
    },
    storeData: [],
    headers: [
      { text: '客户代码', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '托盘码', value: 'trayCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '货品总数量', value: 'totalCount' },
      { text: '货品总重量', value: 'totalWeight' },
      { text: '入库时间', value: 'inTime' },
      { text: '出库时间', value: 'outTime' },
      { text: '状态', value: 'status' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    async loadStore() {
      this.storeData = await store.list()
    }
  },
  mounted: function() {
    this.loadStore()
  }
}
</script>
