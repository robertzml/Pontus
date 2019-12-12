<template>
  <v-autocomplete label="请选择货品" prepend-icon="category" v-model="selectedCargo" :filter="customFilter" :items="cargoData" item-value="id" item-text="name" return-object clearable :rules="cargoRules" @change="selectItem">
    <template v-slot:selection="data">
      {{ data.item.name }}
    </template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title v-html="data.item.name"></v-list-item-title>
        <v-list-item-subtitle>类别：{{data.item.categoryName}}</v-list-item-subtitle>
        <v-list-item-subtitle>客户：{{data.item.customerName}}</v-list-item-subtitle>
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
    },
    customerNumber: function() {
      let vm = this
      cargo.getListByNumber(this.customerNumber).then(res => {
        vm.cargoData = res
      })
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name
      const textTwo = item.categoryName
      const searchText = queryText

      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
    },

    selectItem(val) {
      if (val == null || val == undefined) {
        this.$emit('update:cargoId', '')
      } else {
        this.$emit('update:cargoId', val.id)
      }
    }
  },
  mounted: function() {
    /*
    let vm = this
    cargo.getListByNumber(this.customerNumber).then(res => {
      vm.cargoData = res     
    })
    */
  }
}
</script>
