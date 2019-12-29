<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>任务下发</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="close">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="py-2">
        <v-container fluid class="px-0">
          <v-row dense>
            <v-col cols="2" md="2" sm="4">
              <v-text-field v-model="stockOutTaskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="2" md="2" sm="4">
              <v-text-field :value="`${stockOutTaskInfo.categoryNumber} - ${stockOutTaskInfo.categoryName}`" label="货品类别" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="2" md="2" sm="4">
              <v-text-field v-model="stockOutTaskInfo.outCount" label="出库数量" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="2" md="2" sm="4">
              <v-text-field v-model="stockOutTaskInfo.outWeight" label="出库重量" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn class="primary mt-2" @click="searchStore">搜索库存</v-btn>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col v-for="warehouseId in warehouses" :key="warehouseId" cols="3">
              <v-card>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ warehouseInfo(warehouseId).warehouseName }}</v-list-item-title>
                    <v-list-item-subtitle> 托盘数量：{{ warehouseInfo(warehouseId).trayCount }} </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      在库总数量：{{ warehouseInfo(warehouseId).totalCount }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      在库总重量：{{ warehouseInfo(warehouseId).totalWeight }} 吨
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn text color="primary" @click="selectWarehouse(warehouseId)">
                      选择
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-sheet class="d-flex flex-row">
                <div class="d-flex ml-4 mr-8 align-center">
                  <span>货架</span>
                </div>

                <v-chip-group active-class="primary--text" v-model="sShelfId" class="d-flex justify-space-between">
                  <v-chip v-for="shelf in shelfListData" :key="shelf.id" :value="shelf.id" @click="selectShelf(shelf.id)">
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
                  <v-chip label v-for="row in rowListData" :key="row" :value="row" @click="selectRow(row)">
                    {{ row }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
            <v-col cols="12">
              <v-sheet class="d-flex flex-row">
                <div class="d-flex ml-4 mr-8 align-center">
                  <span>层</span>
                </div>
                <v-chip-group active-class="amber--text" v-model="sLayer" class="d-flex justify-space-between">
                  <v-chip label v-for="layer in layerListData" :key="layer" :value="layer" @click="selectLayer(layer)">
                    {{ layer }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-chip-group active-class="amber--text" column v-model="sPosition" class="d-flex justify-space-between">
                <v-chip label v-for="pos in positionList" :key="pos.id" :value="pos.id" :disabled="isOutCargo(pos)" :color="positionColor(pos)" @click="selectPosition(pos)">
                  {{ pos.number }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="3">
              <v-card>
                <v-card-title class="py-1">
                  <h5>{{ sStoreInfo.positionNumber }}</h5>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>货品名称:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.cargoName }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>类别代码:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.categoryNumber }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>类别名称:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.categoryName }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>在库数量:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.storeCount }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>在库重量:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.storeWeight }} 吨</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>规格:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.specification }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>产地:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.originPlace }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>保质期:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ sStoreInfo.durability }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>入库时间:</v-list-item-content>
                    <v-list-item-content class="align-end">{{
                      $util.displayDate(sStoreInfo.inTime)
                    }}</v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-card-actions>
                  <v-btn color="success darken-1" :disabled="!sStoreInfo" @click="addToCarryOut">添加出库</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from '@/controllers/store'
import stockOut from '@/controllers/stockOut'
import position from '@/controllers/position'

export default {
  name: 'CarryOutCreate',
  data: () => ({
    valid: true,
    storeListData: [],
    shelfListData: [],
    rowListData: [],
    layerListData: [],
    positionList: [],
    sShelfId: 0,
    sRow: 0,
    sLayer: 0,
    sPosition: '',
    sStoreInfo: {},
    digitRules: [v => (v != null && /^\d+/.test(v)) || '请输入数字'],
    taskHeaders: [
      { text: '托盘码', value: 'trayCode', align: 'left' },
      { text: '类别名称', value: 'categoryName' },
      { text: '在库数量', value: 'storeCount' },
      { text: '出库数量', value: 'outCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'storeWeight' },
      { text: '规格', value: 'specification' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
      { text: '备注', value: 'remark' }
    ],
    taskInfoList: []
  }),
  watch: {
    carryOutDialog: function(val) {
      if (val) {
        this.$refs.form.resetValidation()
      }
    }
  },
  computed: {
    ...mapState({
      stockOutInfo: state => state.stockOut.stockOutInfo,
      stockOutTaskInfo: state => state.stockOut.stockOutTaskInfo
    }),

    warehouses: function() {
      let ids = this.storeListData.map(r => r.warehouseId)
      return [...new Set(ids)]
    },

    carryOutDialog: {
      get() {
        return this.$store.state.stockOut.carryOutDialog
      },
      set(val) {
        this.setCarryOutDialog(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setCarryOutDialog: 'stockOut/setCarryOutDialog'
    }),

    close() {
      this.setCarryOutDialog(false)
    },

    // 搜索货品在库库存
    searchStore() {
      let vm = this
      store.findByStockOut({ stockOutId: this.stockOutInfo.id, cargoId: this.stockOutTaskInfo.cargoId }).then(res => {
        vm.storeListData = res
      })
    },

    // 生成仓库选择信息
    warehouseInfo: function(id) {
      let s = this.storeListData.find(r => r.warehouseId == id)

      let sum = this.storeListData.reduce(
        (acc, cur) => {
          if (cur.warehouseId == id) {
            acc.trayCount++
            acc.totalCount += cur.storeCount
            acc.totalWeight += cur.storeWeight
          }

          return acc
        },
        { trayCount: 0, totalCount: 0, totalWeight: 0 }
      )

      let info = {
        warehouseId: id,
        warehouseName: s.warehouseName,
        trayCount: sum.trayCount,
        totalCount: sum.totalCount,
        totalWeight: sum.totalWeight
      }

      return info
    },

    // 选择仓库
    selectWarehouse(id) {
      let shelfs = this.storeListData.filter(r => r.warehouseId == id).map(r => r.shelfId)
      let sids = [...new Set(shelfs)]

      this.shelfListData = sids.map(r => {
        return {
          id: r,
          type: this.storeListData.find(s => s.shelfId == r).shelfType,
          number: this.storeListData.find(s => s.shelfId == r).shelfNumber
        }
      })
    },

    // 选择货架
    selectShelf(id) {
      let rows = this.storeListData.filter(r => r.shelfId == id).map(r => r.row)
      this.rowListData = [...new Set(rows)]
    },

    // 选择排
    selectRow(row) {
      let layers = this.storeListData.filter(r => r.shelfId == this.sShelfId && r.row == row).map(r => r.layer)
      this.layerListData = [...new Set(layers)]
    },

    // 选择层
    selectLayer(layer) {
      this.sLayer = layer
      this.loadPoistions()
    },

    // 载入选中层的仓位
    loadPoistions() {
      let vm = this
      position.getListInLayer({ shelfId: this.sShelfId, row: this.sRow, layer: this.sLayer }).then(res => {
        vm.positionList = res
      })
    },

    // 该仓位是否出库货物
    isOutCargo(pos) {
      let index = this.storeListData.findIndex(r => r.positionId == pos.id)
      return index == -1
    },

    positionColor(pos) {
      if (pos.status == 2) {
        return 'grey darken-4'
      } else if (pos.status == 31) {
        return ''
      } else {
        return 'primary'
      }
    },

    // 选择仓位
    selectPosition(pos) {
      this.sStoreInfo = this.storeListData.find(r => r.positionId == pos.id)
    },

    addToCarryOut() {},

    addStockOut(item) {
      let task = {
        storeId: item.id,
        trayCode: item.trayCode,
        categoryName: item.categoryName,
        storeCount: item.storeCount,
        outCout: 0,
        unitWeight: item.unitWeight,
        storeWeight: item.storeWeight,
        specification: item.specification,
        originPlace: item.originPlace,
        durability: item.durability,
        remark: ''
      }
      this.taskInfoList.push(task)
    },

    submit() {
      if (this.$refs.form.validate()) {
        if (this.taskInfoList.length == 0) {
          this.$store.commit('alertError', '请选择出库货品')
          return
        }

        stockOut.create(this.stockOutInfo, this.taskInfoList).then(res => {})
      }
    }
  },
  mounted: function() {}
}
</script>
