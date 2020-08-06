<template>
  <v-row dense>
    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-green darken-4">仓位库存过滤条件</v-card-subtitle>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="3">
              <cargo-select :cargo-id.sync="filter.cargoId" :cargo-data="cargoList" :required="false"></cargo-select>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="filter.search" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="deep-purple">
          仓位库存记录
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 ml-4">库存总数量: {{ totalCount }}</span>
          <span class="text-subtitle-2 ml-4">库存总重量: {{ totalWeight }} 吨</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="filterData" :items-per-page="10" :search="filter.search">
            <template v-slot:item.initialTime="{ item }">
              {{ item.initialTime | displayDate }}
            </template>
            <template v-slot:item.inTime="{ item }">
              {{ item.inTime | displayDate }}
            </template>
            <template v-slot:item.outTime="{ item }">
              {{ item.outTime | displayDate }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CargoSelect from '@/components/Control/CargoSelect'
import cargo from '@/controllers/cargo'

export default {
  name: 'StoreGrid',
  props: {
    storeList: {
      type: Array,
      required: true
    },
    customerId: {
      type: Number,
      required: false
    }
  },
  components: {
    CargoSelect
  },
  data: () => ({
    headers: [
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' },
      { text: '托盘码', value: 'trayCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '批次', value: 'batch' },
      { text: '货品总数量', value: 'storeCount' },
      { text: '货品总重量(t)', value: 'storeWeight' },
      { text: '初始入库时间', value: 'initialTime' },
      { text: '入库时间', value: 'inTime' },
      { text: '出库时间', value: 'outTime' }
    ],
    filter: {
      cargoId: '',
      search: ''
    },
    cargoList: []
  }),
  computed: {
    filterData() {
      let temp = this.storeList

      if (this.filter.cargoId) {
        temp = temp.filter(r => r.cargoId == this.filter.cargoId)
      }

      return temp
    },

    // 库存总数量
    totalCount: function() {
      return this.storeList.reduce(function(acc, cur) {
        return acc + cur.storeCount
      }, 0)
    },
    // 库存总重量
    totalWeight: function() {
      return this.storeList
        .reduce(function(acc, cur) {
          return acc + cur.storeWeight
        }, 0.0)
        .toFixed(4)
    }
  },
  watch: {
    customerId: function() {
      this.loadCargoData(this.customerId)
    }
  },
  methods: {
    // 载入货品
    loadCargoData(customerId) {
      if (customerId) {
        let vm = this
        cargo.getList(customerId).then(res => {
          vm.cargoList = res
        })
      } else {
        this.cargoList = []
      }
    }
  }
}
</script>
