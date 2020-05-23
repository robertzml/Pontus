<template>
  <v-sheet class="transparent">
    <v-data-table :headers="taskHeaders" :items="taskInfoList" hide-default-footer disable-pagination>
      <template v-slot:item.action="{ item }">
        <v-btn small color="success" class="mr-2" @click="editItem(item)">
          编辑
        </v-btn>
        <v-btn small color="warning" @click="deleteItem(item)">删除</v-btn>
      </template>

      <template v-slot:footer>
        <span class="ml-4">出库货物数量：{{ taskInfoList.length }}</span>
        <span class="ml-4">出库数量合计: {{ totalOutCount }} </span>
      </template>
    </v-data-table>

    <v-dialog v-model="taskEditDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">编辑</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.warehouseName" label="所在仓库" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.storeCount" label="在库数量" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.outCount" label="移出数量"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.unitWeight" label="单位重量(kg)" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.storeWeight" label="在库重量(t)" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.outWeight" label="移出重量(t)"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.remark" label="备注"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditItem">取消</v-btn>
          <v-btn color="blue darken-1" text @click="saveEditItem">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
export default {
  name: 'NormalStoreOut',
  data: () => ({
    stockOutInfo: {},
    taskHeaders: [
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '所在仓库', value: 'warehouseName' },
      { text: '存放位置', value: 'place' },
      { text: '在库数量', value: 'storeCount' },
      { text: '出库数量', value: 'outCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '出库重量(t)', value: 'outWeight' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: [],
    taskEditDialog: false,
    editedItem: {
      warehouseName: '',
      storeCount: 0,
      outCount: 0,
      unitWeight: 0,
      storeWeight: 0,
      outWeight: 0,
      remark: ''
    },
    defaultItem: {
      warehouseName: '',
      storeCount: 0,
      outCount: 0,
      unitWeight: 0,
      storeWeight: 0,
      outWeight: 0,
      remark: ''
    },
    editShelfCodes: [],
    editedIndex: -1
  }),
  computed: {
    totalOutCount: function() {
      return this.taskInfoList.reduce(function(acc, cur) {
        return acc + parseInt(cur.outCount)
      }, 0)
    }
  },
  watch: {
    'editedItem.outCount': function(val) {
      this.editedItem.outWeight = ((val * this.editedItem.unitWeight) / 1000).toFixed(4)
    }
  },
  methods: {
    init(outInfo) {
      this.stockOutInfo = outInfo
      this.taskInfoList = []
    },

    // 获取出库任务
    getTasks() {
      return this.taskInfoList
    },

    // 添加出库货物
    addTask(item) {
      if (item == null || item == undefined) {
        return
      }

      if (this.taskInfoList.findIndex(r => r.storeId == item.id) != -1) {
        return
      }

      let task = {
        storeId: item.id,
        cargoId: item.cargoId,
        cargoName: item.cargoName,
        specification: item.specification,
        storeCount: item.storeCount,
        outCount: 0,
        unitWeight: item.unitWeight,
        storeWeight: item.storeWeight,
        outWeight: 0.0,
        warehouseId: item.warehouseId,
        warehouseName: item.warehouseName,
        place: item.place,
        remark: ''
      }

      this.taskInfoList.push(task)
    },

    editItem(item) {
      this.editedIndex = this.taskInfoList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.taskEditDialog = true
    },

    deleteItem(item) {
      const index = this.taskInfoList.indexOf(item)
      this.taskInfoList.splice(index, 1)
    },

    closeEditItem() {
      this.taskEditDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    saveEditItem() {
      Object.assign(this.taskInfoList[this.editedIndex], this.editedItem)
      this.taskEditDialog = false
    }
  }
}
</script>
