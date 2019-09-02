<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-data-table :headers="headers" :items="shelfListData" :items-per-page="10">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>货架列表</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-btn small="" color="primary" class="mb-2" @click="createItem">
                添加货架
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.type="{ item }">
            {{ item.type | shelfType }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn small color="success" @click="viewItem(item)" class="mr-2">
              <v-icon left dark>pageview</v-icon>
              查看
            </v-btn>
            <v-btn small color="warning" @click="editItem(item)">
              <v-icon left dark>edit</v-icon>
              编辑
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>

    <shelf-edit ref="shelfEditMod" @update="loadList"></shelf-edit>

    <v-dialog v-model="dialog" persistent eager max-width="800px">
      <shelf-details ref="shelfDetailsMod"></shelf-details>

      <v-card tile>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ShelfDetails from './Details'
import ShelfEdit from './Edit'

export default {
  name: 'ShelfList',
  props: {
    warehouseId: {
      type: Number,
      default: 0
    }
  },
  components: {
    ShelfDetails,
    ShelfEdit
  },
  data: () => ({
    shelfListData: [],
    headers: [
      { text: '编号', value: 'number', align: 'left', sortable: false },
      { text: '类型', value: 'type', sortable: false },
      { text: '入口数', value: 'entrance', sortable: false },
      { text: '入口编号', value: 'entranceNumber', sortable: false },
      { text: '排数', value: 'row', sortable: false },
      { text: '层数', value: 'layer', sortable: false },
      { text: '进数', value: 'depth', sortable: false },
      { text: '备注', value: 'remark', sortable: false },
      { text: '操作', value: 'action', sortable: false }
    ],
    dialog: false
  }),
  watch: {
    warehouseId: function(val) {
      if (val == 0) {
        this.shelfListData = []
      } else {
        this.loadList()
      }
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
      this.$refs.shelfDetailsMod.getInfo(item.id)
      this.dialog = true
    },
    createItem() {
      this.$refs.shelfEditMod.init(this.warehouseId, 0)
    },
    editItem(item) {
      this.$refs.shelfEditMod.init(this.warehouseId, item.id)
    }
  }
}
</script>
