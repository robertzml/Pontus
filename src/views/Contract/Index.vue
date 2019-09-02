<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>合同管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window=='details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window=='details'" text @click.stop="showEdit">编辑合同</v-btn>
          <v-btn text @click.stop="showCreate">添加合同</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>
      <v-window v-model="window">
        <v-window-item value="list" :eager="true">
          <contract-list ref="listMod" @toDetails="toDetails"></contract-list>
        </v-window-item>
        <v-window-item value="details" :eager="true">
          <contract-details ref="detailsMod"></contract-details>
        </v-window-item>
      </v-window>
    </v-flex>

    <contract-edit ref="contractEditMod"></contract-edit>
  </v-layout>
</template>

<script>
import ContractList from './List'
import ContractDetails from './Details'
import ContractEdit from './Edit'

export default {
  name: 'ContractIndex',
  components: {
    ContractList,
    ContractDetails,
    ContractEdit
  },
  data: () => ({
    window: 'list',
    currentContractId: 0
  }),
  methods: {
    toDetails(id) {
      this.window = 'details'
      this.currentContractId = id
      this.$refs.detailsMod.getInfo(id)
    },
    toList() {
      this.window = 'list'
      this.currentContractId = 0
    },

    showCreate() {
      this.$refs.contractEditMod.init(0)
    },
    showEdit() {
      this.$refs.contractEditMod.init(this.currentContractId)
    }
  }
}
</script>