<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>货品出库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window != 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window == 'details' && currentStockInId != ''" text @click.stop="toEditTask">任务录入</v-btn>
          <v-btn text @click.stop="toCreate">货品出库</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs3 md3>
      <stock-out-list ref="listMod" @activate="showDetails"></stock-out-list>
    </v-flex>
  </v-layout>
</template>

<script>
import StockOutList from './List'

export default {
  name: 'StockOutIndex',
  components: {
    StockOutList
  },
  data: () => ({
    window: 'details'
  })
}
</script>