<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          仓库信息
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col cols="4" md="4">
                <v-text-field v-model="warehouseInfo.name" label="名称" readonly></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="warehouseInfo.number" label="编号" readonly></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field :value="$util.warehouseType(warehouseInfo.type)" label="类型" readonly></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="warehouseInfo.capacity" label="容量" readonly></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="warehouseInfo.remark" label="备注" readonly></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field :value="$util.displayStatus(warehouseInfo.status)" label="状态" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <shelf-list :warehouse-id="this.warehouseId"></shelf-list>
    </v-col>
  </v-row>
</template>

<script>
import warehouse from '@/controllers/warehouse'
import ShelfList from '../Shelf/List'

export default {
  name: 'WarehouseDetails',
  components: {
    ShelfList
  },
  props: {
    showWindow: {
      type: Function,
      default: null
    }
  },
  data: () => ({
    warehouseId: 0,
    warehouseInfo: {}
  }),
  methods: {
    getInfo(id) {
      this.warehouseId = id
      if (this.warehouseId == 0) {
        return
      }

      let vm = this
      warehouse.get(id).then(res => {
        vm.warehouseInfo = res
      })
    }
  }
}
</script>
