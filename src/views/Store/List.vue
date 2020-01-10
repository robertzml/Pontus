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
      <v-card class="mx-auto">
        <v-card-title class="orange">
          库存列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="storeData" :search="search" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | customerType }}
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
export default {
  name: 'StoreList',
  data: () => ({
    search: '',
    storeData: [],
    headers: [
      { text: '编号', value: 'number', align: 'left' },
      { text: '客户名称', value: 'name' },
      { text: '客户类型', value: 'type' },
      { text: '地址', value: 'address' },
      { text: '电话', value: 'telephone' },
      { text: '联系人', value: 'contact' },
      { text: '身份证号', value: 'identityCard' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  })
}
</script>
