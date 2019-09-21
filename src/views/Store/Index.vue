<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>仓库库存</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-select :items="warehouseListData" item-value="id" item-text="name" solo return-object label="仓库选择" @change="selectWarehouse" style="width:200px;">
            <template v-slot:selection="{ item, index }">
              {{ item.number }} - {{ item.name }}
            </template>
          </v-select>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>
      <v-sheet class="d-flex flex-row">
        <div class="d-flex ml-4 mr-8 align-center">
          <span>货架</span>
        </div>

        <v-chip-group active-class="primary--text" v-model="sShelfId" class="d-flex justify-space-between">
          <v-chip v-for="shelf in shelfListData" :key="shelf.id" :value="shelf.id">
            <template v-if="shelf.type==1">
              <v-avatar left>
                <v-icon>home</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
            <template v-else-if="shelf.type==2">
              <v-avatar left>
                <v-icon>storage</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
            <template v-else>
              <v-avatar left>
                <v-icon>cloud</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-flex>

    <v-flex xs12 md12>
      <v-sheet class="d-flex flex-row">
        <div class="d-flex ml-4 mr-8 align-center">
          <span>排</span>
        </div>

        <v-chip-group active-class="amber--text" v-model="sRow" class="d-flex justify-space-between">
          <v-chip label v-for="row in currentShelf.row" :key="row" :value="row">
            {{ row }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-flex>

    <div v-if="sRow != undefined && sRow != 0">
      <v-container fluid class="pa-1">
        <v-row dense>
          <v-col cols="6">
            <v-sheet class="d-flex flex-column">
              <div class="d-flex justify-center">
                <span class="mb-1">仓位情况</span>
              </div>
              <div>
                <v-container fluid>
                  <v-row v-for="depth in maxDepth" :key="depth" no-gutters>
                    <v-col v-for="layer in maxLayer" :key="layer" cols="2">
                      <v-card outlined tile :color="positionDim[layer - 1][depth - 1].isEmpty ? '' : 'primary'">
                        <v-card-text class="my-0 py-0 px-1 text-center align-center caption">
                          {{ positionDim[layer - 1][depth - 1].number }}
                          <v-btn text x-small color="lime" @click="viewDetails(layer, depth)">
                            View
                          </v-btn>
                          <v-btn text x-small color="orange">
                            More
                          </v-btn>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <store-details ref="detailsMod" class="sticky-card"></store-details>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-layout>
</template>

<script>
import warehouse from '@/controllers/warehouse'
import shelf from '@/controllers/shelf'
import position from '@/controllers/position'
import StoreDetails from './Details'

export default {
  name: 'StoreIndex',
  components: {
    StoreDetails
  },
  data: () => ({
    window: 'list',
    warehouseListData: [],
    shelfListData: [],
    positionListData: [],
    sShelfId: 0,
    sRow: 0,
    currentShelf: {},
    sPosition: {}
  }),
  watch: {
    sShelfId(val) {
      if (val == undefined) {
        return
      }
      this.sRow = 0
      this.positionListData = []
      this.currentShelf = this.shelfListData.find(r => r.id == val)
    },
    sRow(val) {
      if (val == undefined || val == 0) {
        return
      }
      this.loadPosition()
    }
  },
  computed: {
    maxDepth: function() {
      if (this.positionListData.length == 0) {
        return 0
      }
      const dep = this.positionListData.map(r => r.depth)
      return Math.max(...dep)
    },

    maxLayer: function() {
      if (this.positionListData.length == 0) {
        return 0
      }
      const layer = this.positionListData.map(r => r.layer)
      return Math.max(...layer)
    },

    positionDim: function() {
      let arr = new Array()

      for (let i = 0; i < this.maxLayer; i++) {
        arr[i] = new Array()
        for (let j = 0; j < this.maxDepth; j++) {
          arr[i][j] = this.positionListData[i * this.maxDepth + j]
        }
      }

      return arr
    }
  },
  methods: {
    init() {
      this.loadWarehouse()
    },

    // 切换视图
    showWindow: function(window) {
      this.window = window
      switch (window) {
        case 'list':
          break
        case 'details':
          break
      }
    },

    loadWarehouse() {
      let vm = this
      warehouse.getList().then(res => {
        vm.warehouseListData = res
      })
    },

    selectWarehouse(val) {
      let vm = this
      shelf.getList(val.id).then(res => {
        vm.shelfListData = res
      })
    },

    loadPosition() {
      let vm = this
      position.getList({ shelfId: this.sShelfId, row: this.sRow }).then(res => {
        vm.positionListData = res
      })
    },

    positionIndex(row, layer, depth) {
      let pos = this.positionListData.find(r => r.row == row && r.layer == layer && r.depth == depth)
      return pos
    },

    viewDetails(layer, depth) {
      this.window = 'details'
      this.$refs.detailsMod.init(this.sShelfId, this.sRow, layer, depth)
    },

    refresh() {}
  },
  mounted: function() {
    this.init()
  }
}
</script>

<style scoped>
.sticky-card {
  top: 60px;
  position: sticky;
  position: -webkit-sticky;
}
</style>