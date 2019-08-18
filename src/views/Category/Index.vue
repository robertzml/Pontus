<template>
  <v-layout wrap>
    <v-flex xs6 md4>
      <v-card dark>
        <v-card-title class="orange">
          类别列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-treeview :items="categoryNodes" v-model="selection" @update:active="showActive" dense activatable rounded></v-treeview>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs6 md4>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CategoryIndex',
  data: () => ({
    categoryList: [],
    categoryNodes: [],
    selection: []
  }),
  methods: {
    showActive(item) {
      if (item.length > 0) {
        console.log(this.categoryList.find(r => r.id == item[0]))
      }
    }
  },
  mounted: function() {
    console.log('mounted')
    let vm = this
    this.$store.dispatch('getCategoryList').then(res => {
      vm.categoryList = res
      vm.categoryNodes = vm.$util.treeListTransform(res)
    })
  }
}
</script>