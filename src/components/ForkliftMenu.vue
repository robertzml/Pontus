<template>
  <v-row dense>
    <v-col cols="6">
      <v-card tile hover height="36" color="pink darken-4" to="forkliftEnterTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center title py-0">
          入库上架
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile hover height="36" color="lime darken-4" to="forkliftLeaveTask" :ripple="{ center: true, class: 'primary--text' }">
        <v-card-text class="text-center title py-0">
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
