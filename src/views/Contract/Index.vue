<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>合同管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'ContractDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="tab == 'ContractDetails'" text @click.stop="showEdit">编辑合同</v-btn>
          <v-btn v-if="tab == 'ContractList'" text @click.stop="showCreate">添加合同</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <contract-edit ref="contractEditMod" @update="refresh"></contract-edit>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
  data: () => ({}),
  computed: {
    ...mapState({
      tab: state => state.contract.tab,
      contractInfo: state => state.contract.contractInfo
    })
  },
  methods: {
    ...mapMutations({
      refresh: 'contract/refresh'
    }),
    ...mapActions({
      showList: 'contract/showList'
    }),

    showCreate() {
      this.$refs.contractEditMod.init(0)
    },
    showEdit() {
      this.$refs.contractEditMod.init(this.contractInfo.id)
    }
  }
}
</script>
