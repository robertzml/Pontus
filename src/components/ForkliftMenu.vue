<template>
  <v-row>
    <v-col cols="6">
      <v-card tile hover height="48" color="pink darken-4" to="forkliftEnterTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline py-2">
          入库上架
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile hover height="48" color="lime darken-4" to="forkliftLeaveTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center headline py-2">
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
