<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">编号模板信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col col="4" md="4" sm="6">
              <v-text-field label="名称*" v-model="sequenceInfo.name" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col col="4" md="4" sm="6">
              <v-select label="表名" v-model="sequenceInfo.tableName" :items="tableItems" @change="selectTable"></v-select>
            </v-col>
            <v-col col="4" md="4" sm="6">
              <v-select label="字段名" v-model="sequenceInfo.fieldName" :items="fieldItems"></v-select>
            </v-col>
            <v-col col="6" md="6" sm="6">
              <v-text-field
                label="格式"
                v-model="sequenceInfo.format"
                :rules="formatRules"
                hint="序列号占位符是0，日期占位符是1"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col col="2" md="2" sm="6">
              <v-checkbox label="使用日期" v-model="sequenceInfo.includeDate"></v-checkbox>
            </v-col>
            <v-col col="4" md="4" sm="6">
              <v-text-field label="附加参数个数" v-model="sequenceInfo.extParamNum"></v-text-field>
            </v-col>
            <v-col col="4" md="4" sm="6">
              <v-text-field label="初始值" v-model="sequenceInfo.initial"></v-text-field>
            </v-col>
            <v-col col="4" md="4" sm="6">
              <v-text-field label="步进" v-model="sequenceInfo.step"></v-text-field>
            </v-col>
            <v-col col="4" md="4" sm="6">
              <v-checkbox label="严格递增" v-model="sequenceInfo.strict"></v-checkbox>
            </v-col>
            <v-col col="6" md="6" sm="6">
              <v-text-field label="备注" v-model="sequenceInfo.remark"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import sequence from '@/controllers/sequence'

export default {
  name: 'SequenceTemplateEdit',
  data: () => ({
    valid: true,
    loading: false,
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
    nameRules: [(v) => !!v || '请输入名称'],
    formatRules: [(v) => !!v || '请输入格式']
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
        sequence.getTemplate(sequenceId).then((res) => {
          vm.sequenceInfo = res

          vm.loadColumnNames(vm.sequenceInfo.tableName)
        })
      }

      this.loadTableNames()
      this.loading = false
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    loadTableNames() {
      let vm = this
      this.$store.dispatch('getTableList').then((res) => {
        vm.tableItems = res
      })
    },

    loadColumnNames(val) {
      let vm = this
      this.$store.dispatch('getColumnList', val).then((res) => {
        vm.fieldItems = res
      })
    },

    selectTable(val) {
      this.loadColumnNames(val)
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        if (!this.sequenceId || this.sequenceId == '') {
          sequence.createTemplate(this.sequenceInfo).then((res) => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加编号模板成功')
              vm.$emit('update')
              vm.loading = false
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        } else {
          sequence.updateTemplate(this.sequenceInfo).then((res) => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改编号模板成功')
              vm.$emit('update')
              vm.loading = false
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        }
      }
    }
  }
}
</script>
