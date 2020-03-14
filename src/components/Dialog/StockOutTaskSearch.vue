<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>出库货物查找</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid class="px-0">
            <v-row dense>
              <v-col cols="6">
                <cargo-select ref="cargoSelect" :cargo-id.sync="cargoId" :cargo-data="cargoListData"></cargo-select>
              </v-col>
              <v-col cols="2">
                <v-btn class="primary mt-2" @click="searchStore" :disabled="!cargoId">搜索库存</v-btn>
              </v-col>

              <v-col cols="12">
                <v-card flat>
                  <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
                  <v-card-text class="pt-0">
                    <v-row dense>
                      <v-col cols="3">
                        <v-select
                          v-model="filter.status"
                          :items="$dict.storeStatus"
                          label="库存状态"
                          item-text="text"
                          item-value="value"
                          hide-details
                          clearable
                        ></v-select>
                      </v-col>
                      <v-col cols="3">
                        <cargo-select :cargo-id.sync="filter.cargoId" :cargo-data="cargoList" :required="false"></cargo-select>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="filter.search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <v-data-table
                  v-model="selectedStores"
                  :headers="headers"
                  :items="filterData"
                  :search="filter.search"
                  show-select
                  :items-per-page="10"
                >
                  <template v-slot:item.status="{ item }">
                    {{ item.status | displayStatus }}
                  </template>
                  <template v-slot:item.inTime="{ item }">
                    {{ item.inTime | displayDate }}
                  </template>
                  <template v-slot:item.outTime="{ item }">
                    {{ item.outTime | displayDate }}
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-btn small color="primary" @click="viewItem(item)">
                      <v-icon left dark>pageview</v-icon>
                      查看
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import store from '@/controllers/store'
import cargo from '@/controllers/cargo'
import CargoSelect from '@/components/Control/CargoSelect'

export default {
  name: 'StockOutTaskSearch',
  components: {
    CargoSelect
  },
  data: () => ({
    dialog: false,
    valid: true,
    stockOutInfo: {},
    cargoId: '',
    cargoListData: [],
    storeListData: [],
    filter: {
      status: 0,
      search: ''
    },
    headers: [
      { text: '托盘码', value: 'trayCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '批次', value: 'batch' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期', value: 'durability' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '在库总数量', value: 'storeCount' },
      { text: '在库总重量(t)', value: 'storeWeight' },
      { text: '入库时间', value: 'inTime' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    selectedStores: []
  }),
  computed: {
    filterData() {
      let temp = this.storeListData

      if (this.filter.status) {
        temp = temp.filter(r => r.status == this.filter.status)
      }
      return temp
    }
  },
  methods: {
    init(outInfo) {
      this.clear()
      this.dialog = true
      this.stockOutInfo = outInfo

      this.loadCargoData()

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    // 载入清空
    clear() {
      this.cargoId = ''
      this.storeListData = []
    },

    // 载入货品
    async loadCargoData() {
      this.cargoListData = await cargo.getList(this.stockOutInfo.customerId)
    },

    // 搜索库存
    async searchStore() {
      if (this.cargoId) {
        this.storeListData = await store.findByCargo({ contractId: this.stockOutInfo.contractId, cargoId: this.cargoId })
      }
    }
  }
}
</script>
