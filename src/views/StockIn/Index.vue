<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>货品入库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window != 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn text @click.stop="showCreate">新建入库单</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="3">
      <stock-in-tree-list ref="listMod"></stock-in-tree-list>
    </v-col>

    <v-col cols="9">
      <v-window v-model="window">
        <v-window-item value="details" eager>
          <stock-in-details ref="detailsMod" :show-title="false"></stock-in-details>
        </v-window-item>

        <v-window-item value="taskDetails" eager>
          <stock-in-task-details ref="taskDetailsMod"></stock-in-task-details>
        </v-window-item>
      </v-window>
    </v-col>

    <v-col cols="12">
      <stock-in-create ref="stockInCreateMod" @close="closeCreate"></stock-in-create>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StockInTreeList from './TreeList'
import StockInCreate from './Create'
import StockInDetails from './Details'
import StockInTaskDetails from './TaskDetails'

export default {
  name: 'StockInIndex',
  components: {
    StockInTreeList,
    StockInCreate,
    StockInDetails,
    StockInTaskDetails
  },
  data: () => ({}),
  computed: mapState({
    window: state => state.stockIn.stockInWindow
  }),
  methods: {
    ...mapActions({
      stockInShowDetails: 'stockIn/showDetails',
      stockInShowTaskDetails: 'stockIn/showTaskDetals'
    }),

    ...mapMutations({ setId: 'stockIn/setId' }),

    refresh() {
      this.$refs.listMod.init()
    },

    // 返回入库列表
    toList() {
      this.stockInShowDetails()
    },

    // 显示货品入库
    showCreate() {
      this.$refs.stockInCreateMod.init(0)
    },

    /**
     * 关闭添加入库
     * val: 入库id
     * update: 是否新增
     *  */
    closeCreate(val, update) {
      if (update) {
        this.$refs.listMod.init()
      }

      this.setId(val)
      this.stockInShowDetails()
    }
  }
}
</script>
