<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card dark>
        <v-card-title class="orange">
          仓库列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="warehouseListData" :search="search" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ $util.warehouseType(item.type) }}
            </template>
            <template v-slot:item.status="{ item}">
              {{ item.status | displayStatus}}
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'WarehouseList',
  data: () => ({
    search: '',
    warehouseListData: [],
    headers: [
      { text: '名称', value: 'name' },
      { text: '编号', value: 'number' },
      { text: '类型', value: 'type' },
      { text: '容量', value: 'capacity' },
      { text: '备注', value: 'remark' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    loadList() {
      let vm = this
      this.$store.dispatch('getWarehouseList').then(res => {
        vm.warehouseListData = res
      })
    },
    viewItem(item) {
      this.$emit('toDetails', item.id)
    }
  },
  mounted: function() {
    this.loadList()
  }
}
</script>