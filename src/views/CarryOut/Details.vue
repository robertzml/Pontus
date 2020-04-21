<template>
  <v-card>
    <v-card-title class="cyan">
      搬运出库任务信息
    </v-card-title>
    <v-card-text>
      <carry-out-details-view :carryOutInfo="carryOutInfo"> </carry-out-details-view>
    </v-card-text>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import carryOut from '@/controllers/carryOut'
import CarryOutDetailsView from '@/components/View/CarryOutDetailsView'

export default {
  name: 'CarryOutDetails',
  components: {
    CarryOutDetailsView
  },
  data: () => ({
    carryOutInfo: {}
  }),
  computed: {
    ...mapState({
      refreshEvent: state => state.carryOut.refreshEvent,
      carryOutId: state => state.carryOut.carryOutId
    })
  },
  watch: {
    refreshEvent: function() {
      this.loadCarryOut()
    }
  },
  methods: {
    async loadCarryOut() {
      this.carryOutInfo = await carryOut.get(this.carryOutId)
    }
  },
  mounted: function() {
    this.loadCarryOut()
  }
}
</script>
