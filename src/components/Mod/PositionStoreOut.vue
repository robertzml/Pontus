<template>
  <v-sheet class="transparent">
    <v-data-table :headers="taskHeaders" :items="taskInfoList" hide-default-footer disable-pagination>
      <template v-slot:item.action="{ item }">
        <v-btn small color="success" class="mr-2" @click="editItem(item)">
          编辑
        </v-btn>
        <v-btn small color="warning" @click="deleteItem(item)">删除</v-btn>
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
                <v-text-field v-model="editedItem.trayCode" label="托盘码" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.storeCount" label="在库数量" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.moveCount" label="移出数量"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.unitWeight" label="单位重量(kg)" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.storeWeight" label="在库重量(t)" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.moveWeight" label="移出重量(t)"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select v-model="editedItem.shelfCode" :items="editShelfCodes" label="货架码"></v-select>
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
import position from '@/controllers/position'

export default {
  name: 'PositionStoreOut',
  data: () => ({
    stockOutInfo: {},
    taskHeaders: [
      { text: '托盘码', value: 'trayCode' },
      { text: '在库数量', value: 'storeCount' },
      { text: '出库数量', value: 'moveCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '在库重量(t)', value: 'storeWeight' },
      { text: '出库重量(t)', value: 'moveWeight' },
      { text: '货架码', value: 'shelfCode' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: [],
    taskEditDialog: false,
    positionInfo: null,
    editedItem: {
      trayCode: '',
      shelfCode: '',
      storeCount: 0,
      moveCount: 0,
      unitWeight: 0,
      storeWeight: 0,
      moveWeight: 0,
      remark: ''
    },
    defaultItem: {
      trayCode: '',
      shelfCode: '',
      storeCount: 0,
      moveCount: 0,
      unitWeight: 0,
      storeWeight: 0,
      moveWeight: 0,
      remark: ''
    },
    editShelfCodes: [],
    editedIndex: -1
  }),
  watch: {
    'editedItem.moveCount': function(val) {
      this.editedItem.moveWeight = ((val * this.editedItem.unitWeight) / 1000).toFixed(4)
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
        storeCount: item.storeCount,
        moveCount: item.storeCount,
        unitWeight: item.unitWeight,
        storeWeight: item.storeWeight,
        moveWeight: item.storeWeight,
        trayCode: item.trayCode,
        shelfCode: item.shelfCode,
        positionId: item.positionId,
        remark: ''
      }

      this.taskInfoList.push(task)
    },

    editItem(item) {
      this.editedIndex = this.taskInfoList.indexOf(item)
      this.editedItem = Object.assign({}, item)

      position.getById(item.positionId).then(res => {
        this.positionInfo = res

        if (this.positionInfo.viceShelfCode) {
          this.editShelfCodes = [this.positionInfo.shelfCode, this.positionInfo.viceShelfCode]
        } else {
          this.editShelfCodes = [this.positionInfo.shelfCode]
        }
      })

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
