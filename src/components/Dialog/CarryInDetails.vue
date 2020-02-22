<template>
  <v-navigation-drawer v-model="drawer" fixed temporary right width="420">
    <v-card flat>
      <v-card-title>
        <p class="headline">搬运入库任务</p>
      </v-card-title>
      <v-card-text>
        <v-container fluid class="mx-0 px-0">
          <v-row dense>
            <v-col cols="6">
              <v-text-field label="任务码" v-model="carryInTask.taskCode" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="搬运类型" :value="$util.carryInTaskType(carryInTask.type)" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="仓位码" v-model="carryInTask.positionNumber" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="货架码" v-model="carryInTask.shelfCode" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="托盘码" v-model="carryInTask.trayCode" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="客户名称" v-model="carryInTask.customerName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="合同名称" v-model="carryInTask.contractName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="货品名称" v-model="carryInTask.cargoName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="货品类别"
                :value="`${carryInTask.categoryNumber} - ${carryInTask.categoryName}`"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="规格" v-model="carryInTask.specification" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="搬运数量" v-model="carryInTask.moveCount" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="搬运重量" v-model="carryInTask.moveWeight" suffix="吨" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="清点人" v-model="carryInTask.checkUserName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="清点时间" :value="$util.displayDateTime(carryInTask.checkTime)" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="接单人" v-model="carryInTask.receiveUserName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="上架时间" :value="$util.displayDateTime(carryInTask.moveTime)" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="确认时间" :value="$util.displayDateTime(carryInTask.finishTime)" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="状态" :value="$util.displayStatus(carryInTask.status)" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field label="备注" v-model="carryInTask.remark" hide-details readonly></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue-grey lighten-3" text @click="drawer = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInDetails',
  data: () => ({
    drawer: false,
    carryInTask: {}
  }),
  methods: {
    init(id) {
      this.loadInfo(id)
      this.shelfCode = ''
      this.drawer = true
    },

    // 载入搬运入库信息
    async loadInfo(id) {
      this.carryInTask = await carryIn.get(id)
    }
  }
}
</script>
