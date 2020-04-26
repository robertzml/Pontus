<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <v-card>
      <v-card-subtitle>搬运入库任务信息</v-card-subtitle>
      <v-card-text>
        <carry-in-details-view :carryInInfo="carryInInfo" :col="2"> </carry-in-details-view>
      </v-card-text>

      <v-card-subtitle>搬运出库任务信息</v-card-subtitle>
      <v-card-text>
        <carry-out-details-view :carryOutInfo="carryOutInfo" :col="2"> </carry-out-details-view>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="dialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import carryIn from '@/controllers/carryIn'
import carryOut from '@/controllers/carryOut'
import CarryInDetailsView from '@/components/View/CarryInDetailsView'
import CarryOutDetailsView from '@/components/View/CarryOutDetailsView'

export default {
  name: 'StoreCarryInfo',
  components: {
    CarryInDetailsView,
    CarryOutDetailsView
  },
  data: () => ({
    dialog: false,
    carryInInfo: {},
    carryOutInfo: {}
  }),
  methods: {
    async init(carryInTaskId, carryOutTaskId) {
      this.dialog = true

      this.carryInInfo = await carryIn.get(carryInTaskId)

      if (carryOutTaskId) {
        this.carryOutInfo = await carryOut.get(carryOutTaskId)
      } else {
        this.carryOutInfo = {}
      }
    }
  }
}
</script>
