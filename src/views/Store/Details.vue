<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          仓位信息
        </v-card-title>
        <v-card-text class="pb-1">
          <v-form>
            <v-container class="px-1">
              <v-row dense>
                <v-col cols="3">
                  <v-text-field v-model="positionInfo.number" label="主编号" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="positionInfo.viceNumber" label="副编号" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-text-field v-model="positionInfo.row" label="排" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-text-field v-model="positionInfo.layer" label="层" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-text-field v-model="positionInfo.depth" label="进" hide-details readonly></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-text class="pb-1">
          <div class="title text--primary">货物信息</div>
          <v-form>
            <v-container class="px-1">
              <v-row dense>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.categoryName" label="类别名称" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.categoryNumber" label="类别编号" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.specification" label="规格" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.originPlace" label="产地" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.durability" label="保质期" hide-details readonly></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-text class="pb-1">
          <div class="title text--primary">库存信息</div>
          <v-form>
            <v-container class="px-1">
              <v-row dense>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.totalCount" label="货品总数量" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.storeCount" label="在库数量" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.totalWeight" label="货品总重量" suffix="吨" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field v-model="storeInfo.trayCode" label="托盘码" hide-details readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="4">
                  <v-text-field :value="$util.displayDate(storeInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md12>

    </v-flex>
  </v-layout>
</template>

<script>
import position from '@/controllers/position'
import store from '@/controllers/store'

export default {
  name: 'StoreDetails',
  data: () => ({
    shelfId: 0,
    row: 0,
    layer: 0,
    depth: 0,
    positionInfo: {},
    storeInfo: {}
  }),
  methods: {
    init(shelfId, row, layer, depth) {
      this.shelfId = shelfId
      this.row = row
      this.layer = layer
      this.depth = depth

      this.loadPosition()
    },

    loadPosition() {
      let vm = this
      position.get({ shelfId: this.shelfId, row: this.row, layer: this.layer, depth: this.depth }).then(res => {
        vm.positionInfo = res

        vm.loadStore()
      })
    },

    loadStore() {
      let vm = this
      store.findStoreIn(this.positionInfo.id).then(res => {
        vm.storeInfo = res
      })
    }
  }
}
</script>
