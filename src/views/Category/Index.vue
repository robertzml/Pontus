<template>
  <v-layout wrap>
    <v-flex xs6 md6>
      <v-card dark>
        <v-card-title class="orange">
          类别列表
        </v-card-title>
        <v-card-text class="px-0" style="max-height:500px; overflow-y:scroll">
          <v-treeview :items="categoryNodes" @update:active="showActive" dense activatable rounded></v-treeview>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs6 md6>
      <v-card dark scrollable>
        <v-card-title class="purple accent-2">
          类别信息
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
  </v-layout>
</template>

<script>
export default {
  name: 'CategoryIndex',
  data: () => ({
    categoryList: [],
    categoryNodes: [],
    categoryInfo: {}
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
        this.categoryInfo = this.categoryList.find(r => r.id == item[0])
      }
    }
  },
  mounted: function() {
    this.loadCategory()
  }
}
</script>