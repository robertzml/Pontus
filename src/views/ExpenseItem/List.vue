<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title class="orange">
            费用项目列表
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
          </v-card-title>
          <v-card-text class="px-0">
            <v-data-table :headers="headers" :items="expenseItemList" :search="search" :items-per-page="10">
              <template v-slot:[`item.type`]="{ item }">
                {{ item.type | expenseItemType }}
              </template>
              <template v-slot:[`item.action`]="{ item }">
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
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import expenseItem from '@/controllers/expenseItem'

export default {
  name: 'ExpenseItemList',
  data: () => ({
    search: '',
    expenseItemList: [],
    headers: [
      { text: '代码', value: 'code', align: 'left' },
      { text: '费用项目', value: 'name' },
      { text: '计算方式', value: 'type' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  computed: mapState({
    refreshEvent: (state) => state.expenseItem.refreshEvent
  }),
  watch: {
    refreshEvent: function () {
      this.loadList()
    }
  },
  methods: {
    ...mapActions({
      showDetails: 'expenseItem/showDetails'
    }),

    // 载入费用项目数据
    async loadList() {
      this.expenseItemList = await expenseItem.getList()
    },

    viewItem(item) {
      this.showDetails(item.id)
    }
  },
  mounted: function () {
    this.loadList()
  }
}
</script>
