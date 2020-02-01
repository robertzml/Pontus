<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>分类管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn text @click.stop="showCreate">添加分类</v-btn>
          <v-btn v-if="currentCategoryId != 0" text @click.stop="showEdit">编辑分类</v-btn>
          <v-btn v-if="currentCategoryId != 0" text @click.stop="deleteDialog = true">删除分类</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="6">
      <v-card dark>
        <v-card-title class="orange">
          分类列表
        </v-card-title>
        <v-card-text class="px-0" style="max-height:600px; overflow-y:scroll">
          <v-treeview :items="categoryNodes" @update:active="showActive" dense activatable rounded></v-treeview>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="6">
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
    </v-col>

    <v-col cols="12">
      <category-edit ref="categoryEditMod" @update="refresh"></category-edit>
    </v-col>

    <v-dialog v-model="deleteDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">删除分类</v-card-title>
        <v-card-text>是否确认删除该分类？仅能删除无子类别和无货品使用的分类。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="deleteDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="deleteLoading" @click="deleteCategory">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import category from '@/controllers/category'
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
    currentCategoryId: 0,
    deleteDialog: false,
    deleteLoading: false
  }),
  methods: {
    loadCategory() {
      let vm = this
      category.getList().then(res => {
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
        category.get(this.currentCategoryId).then(res => {
          vm.categoryInfo = res
        })
      }
      this.loadCategory()
    },
    showCreate() {
      this.$refs.categoryEditMod.init(0)
    },
    showEdit() {
      this.$refs.categoryEditMod.init(this.categoryInfo.id)
    },

    // 删除类别
    deleteCategory() {
      let vm = this
      this.$nextTick(() => {
        this.deleteLoading = true
      })

      category.delete({ id: this.currentCategoryId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除分类成功')
          vm.loadCategory()
          vm.deleteLoading = false
          vm.deleteDialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.deleteLoading = false
        }
      })
    }
  },
  mounted: function() {
    this.loadCategory()
  }
}
</script>
