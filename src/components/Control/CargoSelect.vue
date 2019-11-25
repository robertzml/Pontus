<template>
  <v-autocomplete
    label="请选择货品"
    prepend-icon="category"
    v-model="sCargoId"
    :filter="customFilter"
    :items="cargoData"
    item-value="id"
    item-text="name"
    return-object
    :rules="cargoRules"
    @change="selectItem"
  >
    <template v-slot:selection="data">
      {{ data.item.name }}
    </template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title v-html="data.item.name"></v-list-item-title>
        <v-list-item-subtitle v-html="data.item.categoryName"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import cargo from '@/controllers/cargo'

export default {
  name: 'CargoSelect',
  props: {
    customerNumber: {
      type: String,
      required: true
    },
    cargoId: {
      type: String
    }
  },
  data: () => ({
    cargoData: [],
    sCargoId: null,
    selectCargo: null,
    cargoRules: [v => (!!v && v.id != 0) || '请选择类别']
  }),
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name
      const textTwo = item.categoryName
      const searchText = queryText

      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
    },

    selectItem(val) {
      if (val == null || val == undefined) {
        this.selectCargo = null
        this.$emit('update:cargoId', '')
        this.$emit('change', null)
      } else {
        this.selectCargo = val
        this.$emit('update:cargoId', val.id)
        this.$emit('change', this.selectCargo)
      }
    }
  },
  mounted: function() {
    let vm = this
    cargo.getListByNumber(this.customerNumber).then(res => {
      vm.cargoData = res
      vm.sCargoId = vm.cargoId
    })
  }
}
</script>
