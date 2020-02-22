<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="orange">
          搬运出库列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="carryOutList" :search="search" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | carryOutTaskType }}
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
import carryOut from '@/controllers/carryOut'

export default {
  name: 'CarryOutList',
  data: () => ({
    search: '',
    carryOutList: [],
    headers: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运类型', value: 'type' },
      { text: '在库数量', value: 'storeCount' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '下架时间', value: 'moveTime' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.carryOut.refreshEvent
    })
  },
  watch: {
    refreshEvent: function() {
      this.loadCarryOutList()
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'carryOut/showDetails'
    }),

    async loadCarryOutList() {
      this.carryOutList = await carryOut.getList()
    },

    viewItem(item) {
      this.showDetails(item.id)
    }
  },
  mounted: function() {
    this.loadCarryOutList()
  }
}
</script>
