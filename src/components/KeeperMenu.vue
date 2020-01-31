<template>
  <v-row>
    <v-col cols="3">
      <v-card tile hover height="60" color="green" to="keeperStockIn" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline">
          货品入库
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card tile hover height="60" color="cyan darken-2" to="keeperStockOut" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline">
          货品出库
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'KeeperMenu',
  data: () => ({})
}
</script>
