<template>
  <v-row dense>
    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="3">
              <v-select
                v-model="filter.status"
                :items="$dict.stockInStatus"
                label="入库状态"
                item-text="text"
                item-value="value"
                hide-details
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-menu v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="filter.time" label="上架日期" prepend-icon="event" clearable hide-details readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="filter.time" :day-format="$util.pickerDayFormat" @input="timeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="filter.search" prepend-icon="search" label="搜索" single-line hide-details> </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="orange">
          搬运入库列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="filterData" :search="filter.search" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | carryInTaskType }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
            <template v-slot:item.moveTime="{ item }">
              {{ item.moveTime | displayDateTime }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="primary" @click="viewItem(item)">
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
import { mapState, mapActions } from 'vuex'
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInList',
  data: () => ({
    timeMenu: false,
    filter: {
      status: 0,
      time: null,
      search: ''
    },
    carryInList: [],
    headers: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运类型', value: 'type' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '货架码', value: 'shelfCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '上架时间', value: 'moveTime' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.carryIn.refreshEvent
    }),
    filterData() {
      let temp = this.carryInList

      if (this.filter.status) {
        temp = temp.filter(r => r.status == this.filter.status)
      }

      if (this.filter.time) {
        let t = this.$moment(this.filter.time)
        temp = temp.filter(r => t.isSame(r.moveTime, 'day'))
      }

      return temp
    }
  },
  watch: {
    refreshEvent: function() {
      this.loadCarryInList()
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'carryIn/showDetails'
    }),

    async loadCarryInList() {
      this.carryInList = await carryIn.getList()
    },

    viewItem(item) {
      this.showDetails(item.id)
    }
  },
  mounted: function() {
    this.loadCarryInList()
  }
}
</script>
