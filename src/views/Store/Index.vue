<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>仓库库存</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-select :items="warehouseListData" item-value="id" item-text="name" solo label="仓库选择" style="width:200px;">
            <template v-slot:selection="{ item, index }">
              {{ item.number }} - {{ item.name }}
            </template>
          </v-select>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>

    </v-flex>
  </v-layout>
</template>

<script>
import warehouse from '@/controllers/warehouse'

export default {
  name: 'StoreIndex',
  data: () => ({
    warehouseListData: [],
    items: ['Foo', 'Bar', 'Fizz', 'Buzz']
  }),
  methods: {
    init() {
      this.loadWarehouse()
    },

    loadWarehouse() {
      let vm = this
      warehouse.getList().then(res => {
        vm.warehouseListData = res
      })
    },
    refresh() {}
  },
  mounted: function() {
    this.init()
  }
}
</script>
