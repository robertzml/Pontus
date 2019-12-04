<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>客户管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window == 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window == 'list'" text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="window == 'details'" text @click.stop="showEdit">编辑客户</v-btn>
          <v-btn text @click.stop="showCreate">添加客户</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-window v-model="window">
        <v-window-item value="list" :eager="true">
          <customer-list ref="listMod" @toDetails="toDetails"></customer-list>
        </v-window-item>
        <v-window-item value="details" :eager="true">
          <customer-details ref="detailsMod"></customer-details>
        </v-window-item>
      </v-window>
    </v-col>

    <v-col cols="12">
      <customer-edit ref="customerEditMod" @update="refresh"></customer-edit>
    </v-col>
  </v-row>
</template>

<script>
import CustomerList from './List'
import CustomerDetails from './Details'
import CustomerEdit from './Edit'

export default {
  name: 'CustomerIndex',
  components: {
    CustomerList,
    CustomerDetails,
    CustomerEdit
  },
  data: () => ({
    window: 'list',
    currentCustomerId: 0
  }),
  methods: {
    toDetails(id) {
      this.window = 'details'
      this.currentCustomerId = id
      this.$refs.detailsMod.getInfo(id)
    },
    toList() {
      this.window = 'list'
      this.currentCustomerId = 0
    },
    showCreate() {
      this.$refs.customerEditMod.init(0)
    },
    showEdit() {
      this.$refs.customerEditMod.init(this.currentCustomerId)
    },

    refresh() {
      if (this.currentCustomerId != 0) {
        this.$refs.detailsMod.getInfo(this.currentCustomerId)
      } else {
        this.$refs.listMod.loadList()
      }
    }
  },
  mounted: function() {}
}
</script>
