<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>仓库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window=='details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window=='details'" text @click.stop="showEdit">编辑仓库</v-btn>
          <v-btn text @click.stop="showCreate">添加仓库</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>
      <v-window v-model="window">
        <v-window-item value="list" :eager="true">
          <warehouse-list ref="listMod" @toDetails="toDetails"></warehouse-list>
        </v-window-item>
      </v-window>
    </v-flex>

    <warehouse-edit ref="warehouseEditMod"></warehouse-edit>
  </v-layout>
</template>

<script>
import WarehouseList from './List'
import WarehouseEdit from './Edit'

export default {
  name: 'WarehouseIndex',
  components: {
    WarehouseList,
    WarehouseEdit
  },
  data: () => ({
    window: 'list'
  }),
  methods: {
    showCreate: function() {
      this.$refs.warehouseEditMod.init(0)
    },

    toDetails(id) {
      this.window = 'details'
      // this.currentCustomerId = id
      // this.$refs.detailsMod.getInfo(id)
    },
    toList() {
      this.window = 'list'
    }
  }
}
</script>
