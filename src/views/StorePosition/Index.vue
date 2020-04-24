<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>仓库库存</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-select
            :items="warehouseListData"
            item-value="id"
            item-text="name"
            solo
            return-object
            label="仓库选择"
            @change="selectWarehouse"
            style="width:200px;"
          >
            <template v-slot:selection="{ item }"> {{ item.number }} - {{ item.name }} </template>
          </v-select>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-sheet class="d-flex flex-row">
        <div class="d-flex ml-4 mr-8 align-center">
          <span>货架</span>
        </div>

        <v-chip-group active-class="primary--text" v-model="sShelfId" class="d-flex justify-space-between">
          <v-chip v-for="shelf in shelfListData" :key="shelf.id" :value="shelf.id">
            <template v-if="shelf.type == 1">
              <v-avatar left>
                <v-icon>home</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
            <template v-else-if="shelf.type == 2">
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
    </v-col>

    <v-col cols="12">
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
    </v-col>

    <v-col cols="12">
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
                        <v-card outlined tile :color="positionColor(positionDim[layer - 1][depth - 1])">
                          <v-card-text class="my-0 py-0 px-1 text-center align-center caption">
                            {{ positionDim[layer - 1][depth - 1].number }}
                            <v-btn text x-small color="lime" @click="viewDetails(layer, depth)">
                              View
                            </v-btn>
                            <v-btn text x-small color="orange" @click="moveTray(layer, depth)">
                              Move
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
              <store-position-info ref="detailsMod" :position-info="sPosition" :store-list="storeList" class="sticky-card"></store-position-info>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import warehouse from '@/controllers/warehouse'
import shelf from '@/controllers/shelf'
import position from '@/controllers/position'
import store from '@/controllers/store'
import StorePositionInfo from './Info'

export default {
  name: 'StorePositionIndex',
  components: {
    StorePositionInfo
  },
  data: () => ({
    warehouseListData: [],
    shelfListData: [],
    positionListData: [],
    sShelfId: 0,
    sRow: 0,
    currentShelf: {},
    sPosition: {},
    storeList: []
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

    loadWarehouse() {
      let vm = this
      warehouse.getList(2).then(res => {
        vm.warehouseListData = res
      })
    },

    // 菜单栏选择仓库，载入货架列表
    selectWarehouse(val) {
      let vm = this
      shelf.getList(val.id).then(res => {
        vm.shelfListData = res
      })
    },

    // 载入一列中的仓位
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

    // 查看仓位详情
    async viewDetails(layer, depth) {
      this.sPosition = await position.get({ shelfId: this.sShelfId, row: this.sRow, layer: layer, depth: depth })
      this.storeList = await store.findStoreIn(this.sPosition.id)
    },

    // 移动托盘
    moveTray(layer, depth) {
      const pos = this.positionListData.find(r => r.row == this.sRow && r.layer == layer && r.depth == depth)
      if (pos.status != 32) {
        this.$store.commit('alertError', '该仓位无托盘，无法移动')
        return
      }
    },

    // 根据状态显示仓位颜色
    positionColor(pos) {
      if (pos.status == 2) {
        return 'grey darken-4'
      } else if (pos.status == 31) {
        return ''
      } else {
        return 'primary'
      }
    }
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
