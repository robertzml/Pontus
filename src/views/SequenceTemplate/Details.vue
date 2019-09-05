<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          自动编号模板信息
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <v-flex xs6 md4>
                <v-text-field v-model="info.name" label="名称" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md4>
                <v-text-field v-model="info.tableName" label="表名" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md4>
                <v-text-field v-model="info.fieldName" label="字段名" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md6>
                <v-text-field v-model="info.format" label="格式" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-checkbox label="使用日期" v-model="info.includeDate" readonly></v-checkbox>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field label="附加参数个数" v-model="info.extParamNum" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md4>
                <v-text-field label="初始值" v-model="info.initial" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md4>
                <v-text-field label="步进" v-model="info.step" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md4>
                <v-checkbox label="严格递增" v-model="info.strict" readonly></v-checkbox>
              </v-flex>
              <v-flex xs12 md12>
                <v-textarea label="备注" :value="info.remark" readonly auto-grow></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'SequenceTemplateDetails',
  data: () => ({
    sequenceId: '',
    info: {}
  }),
  methods: {
    getInfo(id) {
      this.sequenceId = id
      if (this.sequenceId == '') {
        return
      }

      let vm = this
      this.$store.dispatch('getSequenceTemplate', id).then(res => {
        vm.info = res
      })
    }
  }
}
</script>