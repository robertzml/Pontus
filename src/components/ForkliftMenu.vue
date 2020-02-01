<template>
  <v-row>
    <v-col cols="3">
      <v-card tile hover height="60" color="green" to="forkliftReceiveInTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline">
          入库接单
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card tile hover height="60" color="teal darken-4" to="forkliftEnterTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline">
          入库上架
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card tile hover height="60" color="brown darken-4" to="forkliftReceiveOutTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline">
          出库接单
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card tile hover height="60" color="blue-grey darken-3" to="forkliftLeaveTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline">
          出库下架
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ForkliftMenu',
  data: () => ({})
}
</script>
