<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel>
      <v-expansion-panel-header ripple class="cyan darken-1">库存信息</v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <v-card flat>
          <v-card-text class="pa-0">
            <v-row dense>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.cargoName" label="货品名称" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field :value="`${storeInfo.categoryNumber} - ${storeInfo.categoryName}`" label="类别" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.trayCode" label="托盘码" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.positionNumber" label="仓位码" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.specification" label="规格" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.batch" label="批次" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.originPlace" label="产地" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.durability" label="保质期" suffix="月" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.unitWeight" label="单位重量" suffix="千克" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.storeCount" label="在库数量" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.storeWeight" label="在库重量" suffix="吨" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.shelfCode" label="上货货架码" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field :value="$util.displayDate(storeInfo.initialTime)" label="初始时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field :value="$util.displayDate(storeInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field :value="$util.displayDate(storeInfo.outTime)" label="出库时间" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field :value="$util.displayStatus(storeInfo.status)" label="状态" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field v-model="storeInfo.remark" label="备注" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" lg="2" md="3" sm="4">
                <v-text-field :value="$util.displayDateTime(storeInfo.createTime)" label="库存创建时间" hide-details readonly></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="userInfo.userGroupId == 1" @click="dialog = true">删除库存记录</v-btn>
          </v-card-actions>

          <v-dialog v-model="dialog" persistent max-width="300">
            <v-card>
              <v-card-title class="text-h5">删除库存记录</v-card-title>
              <v-card-text> 是否确认删除该库存记录？该库存关联库存，搬运任务均被删除，初始入库货物合计数重新计算。 占用仓位状态需手动修改。 </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
                <v-btn color="green darken-1" text :loading="loading" @click="forceDelete">确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header ripple class="cyan darken-3">冷藏费</v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <v-card>
          <v-row dense>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="$util.displayDate(coldFeeInfo.startTime)" label="起始日期" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field :value="$util.displayDate(coldFeeInfo.endTime)" label="结束日期" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="coldFeeInfo.days" label="天数" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field
                v-model="coldFeeInfo.unitPrice"
                label="单价"
                :suffix="$util.billingTypeUnit(storeInfo.billingType)"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field
                v-model="coldFeeInfo.totalMeter"
                label="计量"
                :suffix="$util.billingTypeMeter(storeInfo.billingType)"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="coldFeeInfo.coldFee" suffix="元" label="费用" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header ripple class="teal darken-1">库存记录变动</v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <v-timeline dense>
          <v-timeline-item v-for="(item, index) in orderInfo" :key="item.id">
            <v-card class="elevation-2">
              <v-card-title class="title pb-1 purple lighten-2">
                #{{ index + 1 }}
                <v-spacer></v-spacer>
                <v-btn text @click="showCarryInfo(item)">搬运情况</v-btn>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-row dense>
                    <v-col cols="2">
                      <v-list-item>
                        <v-list-item-title>入库日期</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ item.inTime | displayDate }}
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>出库日期</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ item.outTime | displayDate }}
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-col>

                    <v-divider inset vertical></v-divider>

                    <v-col cols="3">
                      <v-list-item>
                        <v-list-item-title>在库数量</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ item.storeCount }}
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>在库重量</v-list-item-title>
                        <v-list-item-subtitle class="text-right"> {{ item.storeWeight }} t </v-list-item-subtitle>
                      </v-list-item>
                    </v-col>

                    <v-divider inset vertical></v-divider>

                    <v-col cols="3">
                      <v-list-item>
                        <v-list-item-title>托盘码</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ item.trayCode }}
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>仓位码</v-list-item-title>
                        <v-list-item-subtitle class="text-right"> {{ item.positionNumber }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-col>

                    <v-divider inset vertical></v-divider>

                    <v-col cols="3">
                      <v-list-item>
                        <v-list-item-title>状态</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ item.status | displayStatus }}
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>创建时间</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ item.createTime | displayDateTime }}
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-list>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <store-carry-info ref="carryInfoMod"></store-carry-info>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import store from '@/controllers/store'
import expense from '@/controllers/expense'
import StoreCarryInfo from './Dialog/CarryInfo'

export default {
  name: 'StoreDetails',
  components: {
    StoreCarryInfo
  },
  data: () => ({
    dialog: false,
    loading: false,
    panel: [0, 1],
    storeInfo: {},
    coldFeeInfo: {},
    orderInfo: []
  }),
  computed: {
    ...mapState({
      storeId: (state) => state.store.storeId,
      refreshEvent: (state) => state.store.refreshEvent
    }),
    ...mapGetters(['userInfo'])
  },
  watch: {
    refreshEvent: function () {
      this.loadData()
    }
  },
  methods: {
    ...mapActions({
      showList: 'store/showList'
    }),

    async loadData() {
      const now = this.$moment().format('YYYY-MM-DD')

      this.storeInfo = await store.find(this.storeId)
      this.coldFeeInfo = await expense.getStoreColdFee({ storeId: this.storeId, current: now, storeType: 2 })
      this.orderInfo = await store.findInOrder(this.storeId)
    },

    showCarryInfo(item) {
      this.$refs.carryInfoMod.init(item.carryInTaskId, item.carryOutTaskId)
    },

    // 删除库存记录
    forceDelete() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      store.forceDelete({ id: this.storeId }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除库存记录成功')
          vm.loading = false
          vm.dialog = false
          vm.showList()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  },
  activated: function () {
    this.loadData()
  }
}
</script>
