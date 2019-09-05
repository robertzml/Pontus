<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">编号模板信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="名称*" v-model="sequenceInfo.name" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select label="表名" v-model="sequenceInfo.tableName" :items="tableItems" @change="selectTable"></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select label="字段名" v-model="sequenceInfo.fieldName" :items="fieldItems"></v-select>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="格式" v-model="sequenceInfo.format" :rules="formatRules" hint="序列号占位符是0，日期占位符是1" persistent-hint></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-checkbox label="使用日期" v-model="sequenceInfo.includeDate"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field label="附加参数个数" v-model="sequenceInfo.extParamNum"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="初始值" v-model="sequenceInfo.initial"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="步进" v-model="sequenceInfo.step"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-checkbox label="严格递增" v-model="sequenceInfo.strict"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm6 md8>
                <v-text-field label="备注" v-model="sequenceInfo.remark"></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SequenceTemplateEdit',
  data: () => ({
    valid: true,
    dialog: false,
    sequenceId: 0,
    sequenceInfo: {
      name: '',
      tableName: '',
      fieldName: '',
      format: '',
      includeDate: true,
      initial: 1,
      step: 1,
      extParamNum: 0,
      strict: false,
      remark: ''
    },
    tableItems: [],
    fieldItems: [],
    nameRules: [v => !!v || '请输入名称'],
    formatRules: [v => !!v || '请输入格式']
  }),
  methods: {
    init(sequenceId) {
      this.sequenceId = sequenceId
      if (!sequenceId || sequenceId == '') {
        this.sequenceInfo = {
          name: '',
          tableName: '',
          fieldName: '',
          format: '',
          includeDate: true,
          initial: 1,
          step: 1,
          extParamNum: 0,
          strict: false,
          remark: ''
        }
      } else {
        let vm = this
        this.$store.dispatch('getSequenceTemplate', sequenceId).then(res => {
          vm.sequenceInfo = res

          vm.loadColumnNames(vm.sequenceInfo.tableName)
        })
      }

      this.loadTableNames()
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    loadTableNames() {
      let vm = this
      this.$store.dispatch('getTableList').then(res => {
        vm.tableItems = res
      })
    },

    loadColumnNames(val) {
      let vm = this
      this.$store.dispatch('getColumnList', val).then(res => {
        vm.fieldItems = res
      })
    },

    selectTable(val) {
      this.loadColumnNames(val)
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this
        if (!this.sequenceId || this.sequenceId == '') {
          this.$store.dispatch('createSequenceTemplate', this.sequenceInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加编号模板成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        } else {
          this.$store.dispatch('updateSequenceTemplate', this.sequenceInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改编号模板成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        }
      }
    }
  }
}
</script>
