<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-tabs v-model="tab" grow>
        <v-tab>图形视图</v-tab>
        <v-tab>
          列表视图
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container class="pa-2" fluid>
            <v-row>
              <v-col v-for="item in warehouseListData" :key="item.id" cols="sm">
                <v-card class="pa-2" tile hover>
                  <v-list-item three-line>
                    <v-list-item-content class="align-self-start">
                      <v-list-item-title class="headline mb-4">{{ item.name }}</v-list-item-title>

                      <v-list-item-subtitle class="mb-2">编号：{{ item.number }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="mb-2">类型：{{ item.type | warehouseType }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="mb-2">容量: {{ item.capacity }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="mb-2">备注: {{ item.remark }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar size="125" tile>
                      <v-img src="@/assets/warehouse.png"></v-img>
                    </v-list-item-avatar>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn small text color="success" @click.stop="viewItem(item)">
                      查看
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-title class="orange">
              仓库列表
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details>
              </v-text-field>
            </v-card-title>

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
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'WarehouseList',
  data: () => ({
    tab: null,
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
