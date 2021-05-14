<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>费用项目管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'ExpenseItemDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="tab == 'ExpenseItemDetails'" text @click.stop="showEdit">编辑费用项目</v-btn>
          <v-btn v-if="tab == 'ExpenseItemList'" text @click.stop="showCreate">添加费用项目</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <expense-item-create ref="createMod" @close="refresh"></expense-item-create>
      <expense-item-edit ref="editMod" @close="refresh"></expense-item-edit>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ExpenseItemList from './List'
import ExpenseItemDetails from './Details'
import ExpenseItemCreate from './Create'
import ExpenseItemEdit from './Edit'

export default {
  name: 'ExpenseItemIndex',
  components: {
    ExpenseItemList,
    ExpenseItemDetails,
    ExpenseItemCreate,
    ExpenseItemEdit
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: (state) => state.expenseItem.tab,
      itemId: (state) => state.expenseItem.itemId
    })
  },
  methods: {
    ...mapActions({
      showList: 'expenseItem/showList'
    }),

    ...mapMutations({
      refresh: 'expenseItem/refresh'
    }),

    showCreate() {
      this.$refs.createMod.init()
    },

    showEdit() {
      this.$refs.editMod.init(this.itemId)
    }
  }
}
</script>
