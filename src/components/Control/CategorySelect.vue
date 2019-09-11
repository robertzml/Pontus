<template>
  <v-autocomplete label="请选择类别" prepend-icon="people" v-model="sCategoryId" :filter="customFilter" :items="categoryData" item-value="id" item-text="name" return-object :rules="categoryRules" @change="selectItem">
    <template v-slot:selection="data">
      {{ data.item.number }} - {{ data.item.name }}
    </template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title v-html="data.item.name"></v-list-item-title>
        <v-list-item-subtitle v-html="data.item.number"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import category from '@/controllers/category'

export default {
  name: 'CategorySelect',
  props: {
    categoryId: {
      type: Number
    }
  },
  data: () => ({
    categoryData: [],
    sCategoryId: null,
    selectCategory: null,
    categoryRules: [v => (!!v && v.id != 0) || '请选择类别']
  }),
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name
      const textTwo = item.number
      const searchText = queryText

      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
    },

    selectItem(val) {
      if (val == null || val == undefined) {
        this.selectCategory = null
        this.$emit('update:categoryId', 0)
        this.$emit('change', null)
      } else {
        this.selectCategory = val
        this.$emit('update:categoryId', val.id)
        this.$emit('change', this.selectCategory)
      }
    }
  },
  mounted: function() {
    let vm = this
    category.getList().then(res => {
      vm.categoryData = res
      vm.sCategoryId = vm.categoryId
    })
  }
}
</script>
