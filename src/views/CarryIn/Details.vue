<template>
  <v-card>
    <v-card-title class="cyan"> 搬运入库任务信息 </v-card-title>
    <v-card-text>
      <carry-in-details-view :carryInInfo="carryInInfo"> </carry-in-details-view>
    </v-card-text>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import carryIn from '@/controllers/carryIn'
import CarryInDetailsView from '@/components/View/CarryInDetailsView'

export default {
  name: 'CarryInDetails',
  components: {
    CarryInDetailsView
  },
  data: () => ({
    carryInInfo: {}
  }),
  computed: {
    ...mapState({
      refreshEvent: (state) => state.carryIn.refreshEvent,
      carryInId: (state) => state.carryIn.carryInId
    })
  },
  watch: {
    refreshEvent: function () {
      this.loadCarryIn()
    }
  },
  methods: {
    async loadCarryIn() {
      this.carryInInfo = await carryIn.find(this.carryInId)
    }
  },
  mounted: function () {
    this.loadCarryIn()
  }
}
</script>
