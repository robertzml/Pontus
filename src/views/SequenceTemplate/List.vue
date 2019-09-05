<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="mx-auto">
        <v-card-title class="orange">
          自动编号模板列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="sequenceListData" :search="search" :items-per-page="10">
            <template v-slot:item.includeDate="{ item }">
              {{ item.includeDate | displayBoolean1 }}
            </template>
            <template v-slot:item.strict="{ item }">
              {{ item.strict | displayBoolean1 }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewItem(item)">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'SequenceTemplateList',
  data: () => ({
    search: '',
    sequenceListData: [],
    headers: [
      { text: '编号', value: 'name', align: 'left' },
      { text: '表名', value: 'tableName' },
      { text: '字段名', value: 'fieldName' },
      { text: '格式', value: 'format' },
      { text: '使用日期', value: 'includeDate' },
      { text: '初始值', value: 'initial' },
      { text: '步进', value: 'step' },
      { text: '附加参数个数', value: 'extParamNum' },
      { text: '严格递增', value: 'strict' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    loadList() {
      let vm = this
      this.$store.dispatch('getSequenceTemplateList').then(res => {
        vm.sequenceListData = res
      })
    },
    viewItem(item) {
      this.$emit('toDetails', item.id)
    }
  },
  mounted: function() {
    this.loadList()
  }
}
</script>
