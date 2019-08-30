<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="mx-auto">
        <v-card-title class="orange">
          货架列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="shelfListData" :items-per-page="10">
            <template v-slot:item.type="{ item }">
              {{ item.type | shelfType }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewItem(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ShelfList',
  props: {
    warehouseId: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    shelfListData: [],
    headers: [
      { text: '编号', value: 'number', align: 'left' },
      { text: '类型', value: 'type' },
      { text: '入口数', value: 'entrance' },
      { text: '入口编号', value: 'entranceNumber' },
      { text: '排数', value: 'row' },
      { text: '层数', value: 'layer' },
      { text: '进数', value: 'depth' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  watch: {
    warehouseId: function(val) {
      this.loadList()
    }
  },
  methods: {
    loadList() {
      let vm = this
      this.$store.dispatch('getShelfList', this.warehouseId).then(res => {
        vm.shelfListData = res
      })
    },
    viewItem(item) {
      this.$emit('toDetails', item.id)
    }
  }
}
</script>
