<template>
  <v-card class="mx-auto">
    <v-card-title class="amber">
      搬运任务
    </v-card-title>
    <v-card-text class="px-0">
      <v-data-table :headers="headers" :items="itemList" hide-default-footer disable-filtering disable-pagination>
        <template v-slot:item.status="{ item }">
          {{ item.status | displayStatus }}
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
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CarryInList',
  props: {
    itemList: {
      type: Array
    }
  },
  data: () => ({
    headers: [
      { text: '托盘码', value: 'trayCode' },
      { text: '搬运数量', value: 'moveCount' },
      { text: '搬运重量(t)', value: 'moveWeight' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '接单人', value: 'receiveUserName' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    ...mapMutations({ showTaskDrawer: 'stockIn/showTaskDrawer' }),

    viewItem(item) {
      this.showTaskDrawer(item)
    }
  }
}
</script>
