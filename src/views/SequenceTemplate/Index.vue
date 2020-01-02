<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>自动编号模板</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window == 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window == 'list'" text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="window == 'details'" text @click.stop="showEdit">编辑模板</v-btn>
          <v-btn text @click.stop="showCreate">添加模板</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-window v-model="window">
        <v-window-item value="list" :eager="true">
          <sequence-template-list ref="listMod" @toDetails="toDetails"></sequence-template-list>
        </v-window-item>
        <v-window-item value="details" :eager="true">
          <sequence-template-details ref="detailsMod"></sequence-template-details>
        </v-window-item>
      </v-window>
    </v-col>

    <v-col cols="12">
      <sequence-template-edit ref="sequenceEditMod" @update="refresh"></sequence-template-edit>
    </v-col>
  </v-row>
</template>

<script>
import SequenceTemplateList from './List'
import SequenceTemplateEdit from './Edit'
import SequenceTemplateDetails from './Details'

export default {
  name: 'SequenceTemplateIndex',
  components: {
    SequenceTemplateList,
    SequenceTemplateEdit,
    SequenceTemplateDetails
  },
  data: () => ({
    window: 'list',
    currentSequenceId: ''
  }),
  methods: {
    toDetails(id) {
      this.window = 'details'
      this.currentSequenceId = id
      this.$refs.detailsMod.getInfo(id)
    },
    toList() {
      this.window = 'list'
      this.currentSequenceId = ''
    },

    showCreate() {
      this.$refs.sequenceEditMod.init()
    },
    showEdit() {
      this.$refs.sequenceEditMod.init(this.currentSequenceId)
    },

    refresh() {
      if (this.currentSequenceId != 0) {
        this.$refs.detailsMod.getInfo(this.currentSequenceId)
      } else {
        this.$refs.listMod.loadList()
      }
    }
  }
}
</script>
