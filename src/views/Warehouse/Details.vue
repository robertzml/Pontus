<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          仓库信息
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <v-flex md4>
                <v-text-field v-model="warehouseInfo.name" label="名称" readonly></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field v-model="warehouseInfo.number" label="编号" readonly></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field :value="$util.warehouseType(warehouseInfo.type)" label="类型" readonly></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field v-model="warehouseInfo.capacity" label="容量" readonly></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field v-model="warehouseInfo.remark" label="备注" readonly></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field :value="$util.displayStatus(warehouseInfo.status)" label="状态" readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md12>
      <shelf-list :warehouse-id="this.warehouseId"></shelf-list>
    </v-flex>
  </v-layout>
</template>

<script>
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
      this.$store.dispatch('getWarehouse', id).then(res => {
        vm.warehouseInfo = res
      })
    }
  }
}
</script>
