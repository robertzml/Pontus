<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="orange">
          搬运入库列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="carryInList" :search="search" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | carryInTaskType }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
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
    search: '',
    carryInList: [],
    headers: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运类型', value: 'type' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '货架码', value: 'shelfCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.carryIn.refreshEvent
    })
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
