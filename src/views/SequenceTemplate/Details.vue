<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title class="cyan"> 自动编号模板信息 </v-card-title>
          <v-card-text>
            <v-form>
              <v-row dense>
                <v-col cols="4" md="4" sm="6">
                  <v-text-field v-model="info.name" label="名称" readonly></v-text-field>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-text-field v-model="info.tableName" label="表名" readonly></v-text-field>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-text-field v-model="info.fieldName" label="字段名" readonly></v-text-field>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-text-field v-model="info.format" label="格式" readonly></v-text-field>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-checkbox label="使用日期" v-model="info.includeDate" readonly></v-checkbox>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-text-field label="附加参数个数" v-model="info.extParamNum" readonly></v-text-field>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-text-field label="初始值" v-model="info.initial" readonly></v-text-field>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-text-field label="步进" v-model="info.step" readonly></v-text-field>
                </v-col>
                <v-col cols="4" md="4" sm="6">
                  <v-checkbox label="严格递增" v-model="info.strict" readonly></v-checkbox>
                </v-col>
                <v-col cols="12" md="12" sm="12">
                  <v-text-field label="备注" :value="info.remark" readonly></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import sequence from '@/controllers/sequence'

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
      sequence.getTemplate(id).then((res) => {
        vm.info = res
      })
    }
  }
}
</script>
