<template>
  <v-sheet class="transparent">
    <v-toolbar dense class="sticky-toolbar">
      <v-toolbar-title>冰块入库</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text @click.stop="showCreate">冰块入库</v-btn>
        <v-btn text @click.stop="refresh">刷新</v-btn>
        <v-btn text @click.stop="print">打印</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-row dense>
      <v-col cols="10"> </v-col>

      <v-col cols="12">
        <ice-stock-create ref="iceStockCreateMod" @close="refresh"></ice-stock-create>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import IceStockCreate from './Dialog/Create.vue'

export default {
  name: 'IceStock',
  components: {
    IceStockCreate
  },

  data: () => ({}),

  methods: {
    refresh() {},

    showCreate() {
      this.$refs.iceStockCreateMod.init()
    }
  }
}
</script>
