<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>仓位管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window == 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window == 'details'" text @click.stop="showEdit">编辑客户</v-btn>
          <v-btn text @click.stop="showCreate">添加客户</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs3 md3>
      <v-list>
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
      <v-subheader>货架列表</v-subheader>
      <v-item-group>
        <v-row>
          <v-col v-for="item in shelfListData" :key="item.id" cols="12" md="4">
            <v-item v-slot:default="{ active, toggle }">
              <v-card class="align-center">
                <v-img src="../../assets/shelf.png" class="white--text" height="200px" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                  <v-card-title class="fill-height align-end">{{ item.number }}</v-card-title>
                </v-img>

                <v-card-actions>
                  <v-btn small text color="success" @click.stop="viewItem(item)">
                    查看
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>

      </v-item-group>
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
    sWarehouse: null
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
  mounted: function() {
    this.init()
  }
}
</script>
