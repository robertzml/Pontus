<template>
  <v-card>
    <v-card-title class="cyan">
      费用项目信息
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="代码" v-model="itemInfo.code" readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="费用项目" v-model="itemInfo.name" readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="计算方式" :value="$util.expenseItemType(itemInfo.type)" readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="备注" v-model="itemInfo.remark" readonly></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import expenseItem from '@/controllers/expenseItem'

export default {
  name: 'ExpenseItemDetails',
  data: () => ({
    itemInfo: {}
  }),
  watch: {
    refreshEvent: function() {
      this.loadInfo()
    }
  },
  computed: mapState({
    itemId: state => state.expenseItem.itemId,
    refreshEvent: state => state.expenseItem.refreshEvent
  }),
  methods: {
    async loadInfo() {
      this.itemInfo = await expenseItem.find(this.itemId)
    }
  },
  mounted: function() {
    this.loadInfo()
  }
}
</script>
