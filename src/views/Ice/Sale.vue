<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>冰块销售</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="showCreate">冰块销售</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <ice-sale-create ref="iceSaleMod"></ice-sale-create>
    </v-col>
  </v-row>
</template>

<script>
import IceSaleCreate from './Dialog/SaleCreate.vue'

export default {
  name: 'IceSale',

  components: {
    IceSaleCreate
  },

  data: () => ({}),

  methods: {
    showCreate() {
      this.$refs.iceSaleMod.init()
    }
  }
}
</script>
