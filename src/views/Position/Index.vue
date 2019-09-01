<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>仓位管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window == 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs3 md3>
      <v-list min-height="300px">
        <v-subheader>仓库选择</v-subheader>
        <v-list-item-group v-model="sWarehouse" mandatory>
          <v-list-item v-for="item in warehouseListData" :key="item.id" :value="item">
            <v-list-item-icon>
              <v-icon>store_mall_directory</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }} - {{ item.number }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-flex>

    <v-flex xs9 md9>
      <v-container class="pa-0" fluid style="max-height:310px;overflow-y:auto;overflow-x:hidden;">
        <v-row>
          <v-col v-for="item in shelfListData" :key="item.id" :value="item" cols="12" sm="6" md="4" class="pt-0">
            <v-card class="align-center" @click="viewShelf(item)">
              <v-list-item three-line>
                <v-list-item-content class="align-self-start">
                  <v-list-item-subtitle class="mb-2">编号：{{ item.number }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">类型：{{ item.type | shelfType }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">入口编号：{{ item.entranceNumber }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">排数: {{ item.row }} 层数: {{ item.layer }} 进数: {{ item.depth }}</v-list-item-subtitle>
                  <v-list-item-subtitle>备注: {{ item.remark }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar width="100px" height="60px" tile class="align-self-center">
                  <v-img :src="item.img"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>

          </v-col>
        </v-row>

      </v-container>
    </v-flex>

    <v-flex xs12 md12>
      <v-window v-model="window">
        <v-window-item value="list" :eager="true">

        </v-window-item>
        <v-window-item value="details" :eager="true">

        </v-window-item>
      </v-window>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  name: 'PositionIndex',
  components: {},
  data: () => ({
    window: 'list',
    currentCustomerId: 0,
    warehouseListData: [],
    shelfListData: [],
    sWarehouse: null,
    sShelf: null
  }),
  watch: {
    sWarehouse: function(val) {
      this.loadShelf(val.id)
    }
  },
  methods: {
    init: function() {
      this.loadWarehouse()
    },

    loadWarehouse: function() {
      let vm = this
      this.$store.dispatch('getWarehouseList', 2).then(res => {
        vm.warehouseListData = res
      })
    },

    loadShelf: function(warehouseId) {
      let vm = this
      this.$store.dispatch('getShelfList', warehouseId).then(res => {
        vm.shelfListData = res
        vm.shelfListData.forEach(r => {
          r.img = require('@/assets/shelf' + r.type + '.png')
        })
      })
    },

    toDetails(id) {
      this.window = 'details'
      this.currentCustomerId = id
      this.$refs.detailsMod.getInfo(id)
    },
    toList() {
      this.window = 'list'
      this.currentCustomerId = 0
    },

    viewShelf(item) {
      console.log(item)
    },

    refresh() {
      if (this.currentCustomerId != 0) {
        this.$refs.detailsMod.getInfo(this.currentCustomerId)
      } else {
        this.$refs.listMod.loadList()
      }
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>
