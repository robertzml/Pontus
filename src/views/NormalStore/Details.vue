<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel>
      <v-expansion-panel-header ripple class="cyan darken-1">库存信息</v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <v-card>
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
              <v-text-field v-model="storeInfo.warehouseName" label="所在仓库" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4">
              <v-text-field v-model="storeInfo.place" label="存放位置" hide-details readonly></v-text-field>
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
                <v-btn text @click="showTaskInfo(item)">出入库情况</v-btn>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-row dense>
                    <v-col cols="3">
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
                        <v-list-item-title>所在仓库</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ item.warehouseName }}
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>存放位置</v-list-item-title>
                        <v-list-item-subtitle class="text-right"> {{ item.place }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-list>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <normal-store-task-info ref="taskInfoMod"></normal-store-task-info>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from 'vuex'
import normalStore from '@/controllers/normalStore'
import expense from '@/controllers/expense'
import NormalStoreTaskInfo from './Dialog/TaskInfo'

export default {
  name: 'NormalStoreDetails',
  components: {
    NormalStoreTaskInfo
  },
  data: () => ({
    panel: [0, 1],
    storeInfo: {},
    coldFeeInfo: {},
    orderInfo: []
  }),
  computed: {
    ...mapState({
      storeId: (state) => state.normalStore.storeId,
      refreshEvent: (state) => state.normalStore.refreshEvent
    })
  },
  watch: {
    refreshEvent: function () {
      this.loadData()
    }
  },
  methods: {
    async loadData() {
      const now = this.$moment().format('YYYY-MM-DD')

      this.storeInfo = await normalStore.find(this.storeId)
      this.coldFeeInfo = await expense.getStoreColdFee({ storeId: this.storeId, current: now, storeType: 1 })
      this.orderInfo = await normalStore.findInOrder(this.storeId)
    },

    showTaskInfo(item) {
      this.$refs.taskInfoMod.init(item.stockInTaskId, item.stockOutTaskId)
    }
  },
  activated: function () {
    this.loadData()
  }
}
</script>
