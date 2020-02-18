<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>任务下发</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="py-2">
      <v-container fluid class="px-0">
        <v-row dense>
          <v-col cols="2" md="2" sm="4">
            <v-text-field v-model="stockOutTaskInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="2" md="2" sm="4">
            <v-text-field :value="`${stockOutTaskInfo.categoryNumber} - ${stockOutTaskInfo.categoryName}`" label="货品类别" hide-details readonly>
            </v-text-field>
          </v-col>
          <v-col cols="2" md="2" sm="4">
            <v-text-field v-model="stockOutTaskInfo.outCount" label="出库数量" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="2" md="2" sm="4">
            <v-text-field v-model="stockOutTaskInfo.outWeight" label="出库重量" suffix="吨" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn class="primary mt-2" @click="searchStore">搜索库存</v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <store-find :store-list="storeListData" @select="selectStore" ref="storeFindMod"></store-find>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="3" v-if="sStoreInfo != null">
            <v-card>
              <v-card-title class="py-1">
                <h5>{{ sStoreInfo.positionNumber }}</h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>托盘码:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.trayCode }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>货品名称:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.cargoName }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>类别代码:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.categoryNumber }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>类别名称:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.categoryName }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>在库数量:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.storeCount }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>在库重量:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.storeWeight }} 吨</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>规格:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.specification }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>批次:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.batch }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>产地:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.originPlace }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>保质期:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ sStoreInfo.durability }} 月</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>入库时间:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ $util.displayDate(sStoreInfo.inTime) }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>是否有其它货物:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ this.positionStores.length > 1 ? '是' : '否' }}</v-list-item-content>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-btn color="success darken-1" :disabled="!sStoreInfo" @click="addToCarryOut">添加出库</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card>
                <v-card-title class="py-1">
                  <h5>待出库托盘</h5>
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table :headers="taskHeaders" :items="taskInfoList" hide-default-footer disable-pagination>
                  <template v-slot:item.action="{ item }">
                    <v-btn small color="success" class="mr-2" @click="editItem(item)">
                      编辑
                    </v-btn>
                    <v-btn small color="warning" @click="deleteItem(item)">删除</v-btn>
                  </template>
                </v-data-table>

                <v-card-actions>
                  <v-btn color="green darken-1" @click="submit" :loading="submitLoading">提交出库</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>

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
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from '@/controllers/store'
import carryOut from '@/controllers/carryOut'
import StoreFind from './StoreFind'

export default {
  name: 'CarryOutCreate',
  components: {
    StoreFind
  },
  data: () => ({
    valid: true,
    submitLoading: false,
    storeListData: [],
    sPositionInfo: null,
    sStoreInfo: null,
    positionStores: [],
    digitRules: [v => (v != null && /^\d+/.test(v)) || '请输入数字'],
    taskHeaders: [
      { text: '托盘码', value: 'trayCode', align: 'left' },
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
    carryOutDialog: function(val) {
      if (val) {
        this.$refs.form.resetValidation()
        this.storeListData = []
        this.taskInfoList = []
      }
    },
    'editedItem.moveCount': function(val) {
      this.editedItem.moveWeight = (val * this.editedItem.unitWeight) / 1000
    }
  },
  computed: {
    ...mapState({
      stockOutInfo: state => state.stockOut.stockOutInfo,
      stockOutTaskInfo: state => state.stockOut.stockOutTaskInfo
    }),

    warehouses: function() {
      let ids = this.storeListData.map(r => r.warehouseId)
      return [...new Set(ids)]
    },

    carryOutDialog: {
      get() {
        return this.$store.state.stockOut.carryOutDialog
      },
      set(val) {
        this.setCarryOutDialog(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setCarryOutDialog: 'stockOut/setCarryOutDialog'
    }),

    close() {
      this.setCarryOutDialog(false)
    },

    // 搜索货品在库库存
    searchStore() {
      let vm = this
      store.findByStockOut({ stockOutId: this.stockOutInfo.id, cargoId: this.stockOutTaskInfo.cargoId }).then(res => {
        vm.storeListData = res
      })
      this.$refs.storeFindMod.init()
    },

    // 选择待出库库存
    selectStore(store, pos) {
      this.sStoreInfo = store
      this.sPositionInfo = pos

      if (pos != null) {
        this.loadPositionStore()
      } else {
        this.positionStores = []
      }
    },

    // 获取仓位上所有库存
    loadPositionStore() {
      let vm = this
      store.findStoreIn(this.sPositionInfo.id).then(res => {
        vm.positionStores = res
      })
    },

    // 添加到出库任务
    addToCarryOut() {
      if (this.sStoreInfo == null) {
        return
      }
      if (this.taskInfoList.findIndex(r => r.trayCode == this.sStoreInfo.trayCode) != -1) {
        return
      }

      let task = {
        storeId: this.sStoreInfo.id,
        stockOutTaskId: this.stockOutTaskInfo.id,
        storeCount: this.sStoreInfo.storeCount,
        moveCount: this.sStoreInfo.storeCount,
        unitWeight: this.sStoreInfo.unitWeight,
        storeWeight: this.sStoreInfo.storeWeight,
        moveWeight: this.sStoreInfo.storeWeight,
        trayCode: this.sStoreInfo.trayCode,
        shelfCode: this.sPositionInfo.shelfCode,
        positionId: this.sStoreInfo.positionId,
        remark: ''
      }

      this.taskInfoList.push(task)
    },

    editItem(item) {
      this.editedIndex = this.taskInfoList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editShelfCodes = [this.sPositionInfo.shelfCode, this.sPositionInfo.viceShelfCode]
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
    },

    // 提交出库搬运任务
    submit() {
      if (this.$refs.form.validate()) {
        if (this.taskInfoList.length == 0) {
          this.$store.commit('alertError', '请选择出库仓位')
          return
        }

        this.$nextTick(() => {
          this.submitLoading = true
        })

        let vm = this
        carryOut.create(this.taskInfoList).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加出库成功')
            this.$emit('close')
            vm.submitLoading = false
            vm.setCarryOutDialog(false)
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.submitLoading = false
          }
        })
      }
    }
  },
  mounted: function() {}
}
</script>
