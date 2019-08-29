<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>分类管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="showCreate">添加分类</v-btn>
          <v-btn v-if="currentCategoryId != 0" text @click.stop="showEdit">编辑分类</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>
    <v-flex xs6 md6>
      <v-card dark>
        <v-card-title class="orange">
          分类列表
        </v-card-title>
        <v-card-text class="px-0" style="max-height:600px; overflow-y:scroll">
          <v-treeview :items="categoryNodes" @update:active="showActive" dense activatable rounded></v-treeview>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs6 md6>
      <v-card dark scrollable>
        <v-card-title class="purple accent-2">
          分类信息
        </v-card-title>
        <v-card-text class="px-5">
          <v-form>
            <v-text-field v-model="categoryInfo.name" label="名称" readonly></v-text-field>
            <v-text-field v-model="categoryInfo.number" label="代码" readonly></v-text-field>
            <v-text-field v-model="categoryInfo.hierarchy" label="级别" readonly></v-text-field>
            <v-text-field v-model="categoryInfo.remark" label="备注" readonly></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>

    <category-edit ref="categoryEditMod" @update="refresh"></category-edit>
  </v-layout>
</template>

<script>
import CategoryEdit from './Edit'

export default {
  name: 'CategoryIndex',
  components: {
    CategoryEdit
  },
  data: () => ({
    categoryList: [],
    categoryNodes: [],
    categoryInfo: {},
    currentCategoryId: 0
  }),
  methods: {
    loadCategory() {
      let vm = this
      this.$store.dispatch('getCategoryList').then(res => {
        vm.categoryList = res
        vm.categoryNodes = vm.$util.treeListTransform(res)
      })
    },
    showActive(item) {
      if (item.length > 0) {
        this.currentCategoryId = item[0]
        this.categoryInfo = this.categoryList.find(r => r.id == item[0])
      }
    },
    refresh() {
      if (this.currentCategoryId != 0) {
        let vm = this
        this.$store.dispatch('getCategory', this.currentCategoryId).then(res => {
          vm.categoryInfo = res
        })
      } else {
        this.loadCategory()
      }
    },
    showCreate() {
      this.$refs.categoryEditMod.init(0)
    },
    showEdit() {
      this.$refs.categoryEditMod.init(this.categoryInfo.id)
    }
  },
  mounted: function() {
    this.loadCategory()
  }
}
</script>
