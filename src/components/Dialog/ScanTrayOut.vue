<template>
  <v-bottom-sheet v-model="dialog" persistent fullscreen scrollable>
    <v-card>
      <v-card-title class="deep-orange darken-2">
        扫托盘码出库
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">取消</v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field label="托盘码*" v-model="trayCode" :counter="6" :rules="trayCodeRules" @keyup.enter="searchTray"> </v-text-field>
              <v-text-field v-show="false"></v-text-field>
              <v-btn color="primary" @click="searchTray" :disabled="!trayCode">搜索托盘</v-btn>
            </v-col>

            <v-col cols="12">
              <v-data-iterator
                :items="carryOutList"
                :disable-pagination="true"
                :hide-default-footer="true"
                style="height: 600px; overflow-y:scroll; overflow-x:hidden;"
              >
                <template v-slot:header>
                  <v-toolbar color="indigo darken-5" dark flat>
                    <v-toolbar-title>货物情况</v-toolbar-title>
                  </v-toolbar>
                </template>

                <template v-slot:default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.taskCode" cols="12" sm="12" md="6" lg="4">
                      <v-card>
                        <v-card-title class="subheading font-weight-bold">{{ item.taskCode }}</v-card-title>

                        <v-divider></v-divider>

                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>
                              <v-text-field
                                label="出库数量"
                                v-model="item.moveCount"
                                class="pr-4"
                                :rules="numberRules"
                                :disabled="item.contractId != stockOutInfo.contractId"
                                @input="editMoveCount(item)"
                              ></v-text-field>
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              <v-text-field label="出库重量" v-model="item.moveWeight" class="pr-4" readonly></v-text-field>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>
                              <v-text-field label="备注" v-model="item.remark" class="pr-4" hide-details></v-text-field>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>客户名称:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.customerName }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>合同名称:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.contractName }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>类别名称:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.categoryName }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>货品名称:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.cargoName }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>规格:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.specification }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>批次:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.batch }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>库存数量:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.storeCount }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>单位重量(kg):</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.unitWeight }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>库存重量(t):</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.storeWeight }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>货架码:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.shelfCode }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>托盘码:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.trayCode }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>仓位码:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.positionNumber }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>下架时间:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.moveTime | displayDateTime }}</v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid || carryOutList.length == 0" :loading="loading" @click="addTask">出库</v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
// 管理员扫托盘码出库
import stockOut from '@/controllers/stockOut'
import carryOut from '@/controllers/carryOut'

export default {
  name: 'ScanTrayOut',
  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    stockOutInfo: {},
    carryOutList: [],
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    numberRules: [v => /^\d+$/.test(v) || '请输入数字'],
    trayCode: ''
  }),
  methods: {
    init(stockOutId) {
      this.loadStockOut(stockOutId)
      this.carryOutList = []
      this.trayCode = ''
      this.dialog = true

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    // 搜索托盘
    async searchTray() {
      if (this.trayCode.length != 6) {
        return
      }

      this.carryOutList = await carryOut.findByTray(this.trayCode)
    },

    // 载入出库单
    async loadStockOut(stockOutId) {
      this.stockOutInfo = await stockOut.get(stockOutId)
    },

    // 修改出库数量
    editMoveCount(item) {
      item.moveWeight = ((item.moveCount * item.unitWeight) / 1000).toFixed(4)
    },

    // 出库
    addTask() {
      if (this.$refs.form.validate()) {
        if (this.carryOutList.length == 0) {
          this.$store.commit('alertError', '托盘未出库')
          return
        }

        if (this.carryOutList.some(r => r.moveCount > r.storeCount || r.moveWeight > r.storeWeight)) {
          this.$store.commit('alertError', '出库数量、出库重量不能大于在库')
          return
        }

        this.$nextTick(() => {
          this.loading = true
        })

        let data = {
          userId: this.$store.state.user.id,
          stockOutId: this.stockOutInfo.id,
          trayCode: this.trayCode,
          tasks: this.carryOutList
        }

        let vm = this
        stockOut.addCarryOut(data).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '出库提交成功')
            vm.$emit('close')
            vm.loading = false
            vm.dialog = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.loading = false
          }
        })
      }
    }
  }
}
</script>
