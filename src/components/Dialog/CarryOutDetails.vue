<template>
  <v-navigation-drawer v-model="drawer" fixed temporary right width="420">
    <v-card flat>
      <v-card-title>
        <p class="headline">搬运出库任务</p>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container fluid class="mx-0 px-0">
            <v-row dense>
              <v-col cols="6">
                <v-text-field label="搬运类型" :value="$util.carryOutTaskType(carryOutInfo.type)" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="仓位码" v-model="carryOutInfo.positionNumber" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="任务码" v-model="carryOutInfo.taskCode" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="托盘码" v-model="carryOutInfo.trayCode" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="在库数量" v-model="carryOutInfo.storeCount" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="在库重量" v-model="carryOutInfo.storeWeight" suffix="吨" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="移出数量" v-model="carryOutInfo.moveCount" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="移出重量" v-model="carryOutInfo.moveWeight" suffix="吨" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="客户名称" v-model="carryOutInfo.customerName" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="合同名称" v-model="carryOutInfo.contractName" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="货品名称" v-model="carryOutInfo.cargoName" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="货品类别"
                  :value="`${carryOutInfo.categoryNumber} - ${carryOutInfo.categoryName}`"
                  hide-details
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="规格" v-model="carryOutInfo.specification" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="批次" v-model="carryOutInfo.batch" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="产地" v-model="carryOutInfo.originPlace" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="保质期" v-model="carryOutInfo.durability" suffix="月" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="接单人" v-model="carryOutInfo.receiveUserName" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="接单时间" :value="$util.displayDateTime(carryOutInfo.receiveTime)" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="清点人" v-model="carryOutInfo.checkUserName" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="清点时间" :value="$util.displayDateTime(carryOutInfo.checkTime)" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="下架时间" :value="$util.displayDateTime(carryOutInfo.moveTime)" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="确认时间" :value="$util.displayDateTime(carryOutInfo.finishTime)" hide-details readonly></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="状态" :value="$util.displayStatus(carryOutInfo.status)" hide-details readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field label="备注" v-model="carryOutInfo.remark" hide-details readonly></v-text-field>
              </v-col>
            </v-row>

            <v-sheet :elevation="10" color="blue-grey darken-2" class="mt-4 pa-2" v-if="carryOutInfo.status == 83">
              <v-subheader>出库确认</v-subheader>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="出库数量" v-model="finishInfo.moveCount"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="出库重量" v-model="moveWeight" suffix="吨" readonly></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="出库确认备注" v-model="finishInfo.remark"></v-text-field>
                </v-col>
              </v-row>
            </v-sheet>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue-grey lighten-3" text @click="drawer = false">关闭</v-btn>
        <v-btn color="success darken-1" v-if="carryOutInfo.status == 83" @click="confirmTask" :loading="submitLoading">出库确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import carryOut from '@/controllers/carryOut'

export default {
  name: 'CarryOutDetails',
  data: () => ({
    drawer: false,
    carryOutInfo: {},
    submitLoading: false,
    finishInfo: {
      moveCount: 0,
      remark: ''
    }
  }),
  methods: {
    init(id) {
      this.loadInfo(id)

      this.drawer = true
    },

    async loadInfo(id) {
      this.carryOutInfo = await carryOut.get(id)
    }
  }
}
</script>
