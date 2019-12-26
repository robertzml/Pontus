<template>
  <v-autocomplete label="请选择货品" prepend-icon="category" v-model="selectedCargo" :filter="customFilter" :items="cargoData" item-value="id" item-text="name" return-object clearable :rules="cargoRules" @change="selectItem">
    <template v-slot:selection="data">
      {{ data.item.name }}
    </template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title v-html="data.item.name"></v-list-item-title>
        <v-list-item-subtitle>类别：{{ data.item.categoryName }}</v-list-item-subtitle>
        <v-list-item-subtitle>代码：{{ data.item.categoryNumber }}</v-list-item-subtitle>
        <v-list-item-subtitle>客户：{{ data.item.customerName }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'CargoSelect',
  props: {
    cargoId: {
      type: String
    },
    cargoData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    selectedCargo: null,
    cargoRules: [v => (!!v && v.id != 0) || '请选择类别']
  }),
  watch: {
    cargoId: function() {
      if (this.cargoId) {
        this.selectedCargo = this.cargoData.find(r => r.id == this.cargoId)
      } else {
        this.selectedCargo = null
      }
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name
      const textTwo = item.categoryName
      const textThree = item.categoryNumber
      const searchText = queryText

      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1 || textThree.indexOf(searchText) > -1
    },

    selectItem(val) {
      if (val == null || val == undefined) {
        this.$emit('update:cargoId', '')
        this.$emit('change', null)
      } else {
        this.$emit('update:cargoId', val.id)
        this.$emit('change', this.selectedCargo)
      }
    }
  },
  mounted: function() {}
}
</script>
