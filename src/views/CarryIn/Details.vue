<template>
  <v-card>
    <v-card-title class="cyan">
      搬运入库任务信息
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="任务码" v-model="carryInInfo.taskCode" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="搬运类型" :value="$util.carryInTaskType(carryInInfo.type)" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="仓位码" v-model="carryInInfo.positionNumber" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="货架码" v-model="carryInInfo.shelfCode" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="托盘码" v-model="carryInInfo.trayCode" hide-details readonly></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="客户名称" v-model="carryInInfo.customerName" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="合同名称" v-model="carryInInfo.contractName" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="货品名称" v-model="carryInInfo.cargoName" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="货品类别" :value="`${carryInInfo.categoryNumber} - ${carryInInfo.categoryName}`" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="搬运数量" v-model="carryInInfo.moveCount" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="搬运重量" v-model="carryInInfo.moveWeight" suffix="吨" hide-details readonly></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="规格" v-model="carryInInfo.specification" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="单位重量" v-model="carryInInfo.unitWeight" suffix="千克" hide-details readonly></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="库存入库时间" :value="$util.displayDate(carryInInfo.inTime)" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="库存出库时间" :value="$util.displayDate(carryInInfo.outTime)" hide-details readonly></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="清点人" v-model="carryInInfo.checkUserName" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="清点时间" :value="$util.displayDateTime(carryInInfo.checkTime)" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="接单人" v-model="carryInInfo.receiveUserName" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="接单时间" :value="$util.displayDateTime(carryInInfo.receiveTime)" hide-details readonly></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="上架时间" :value="$util.displayDateTime(carryInInfo.moveTime)" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="确认时间" :value="$util.displayDateTime(carryInInfo.finishTime)" hide-details readonly></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="状态" :value="$util.displayStatus(carryInInfo.status)" hide-details readonly></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="4" lg="2">
          <v-text-field label="备注" v-model="carryInInfo.remark" hide-details readonly></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInDetails',
  data: () => ({
    carryInInfo: {}
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.carryIn.refreshEvent,
      carryInId: state => state.carryIn.carryInId
    })
  },
  watch: {
    refreshEvent: function() {
      this.loadCarryIn()
    }
  },
  methods: {
    async loadCarryIn() {
      this.carryInInfo = await carryIn.get(this.carryInId)
    },

    // 显示确认
    showCarryInFinish() {
      this.$refs.carryInFinishMod.init(this.carryInInfo.id)
    }
  },
  mounted: function() {
    this.loadCarryIn()
  }
}
</script>
