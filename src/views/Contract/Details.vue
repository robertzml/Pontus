<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          合同信息
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <v-flex md3>
                <v-text-field v-model="info.number" label="合同编号" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.name" label="合同名称" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.customerId" label="地址" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.type" label="合同类型" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.signDate" label="签订日期" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.contactTelephone" label="联系人电话" readonly></v-text-field>
              </v-flex>
              <v-flex md12>
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
  name: 'ContractDetails',
  data: () => ({
    contractId: 0,
    info: {}
  }),
  methods: {
    getInfo(id) {
      this.contractId = id
      if (this.contractId == 0) {
        return
      }

      let vm = this
      this.$store.dispatch('getContract', id).then(res => {
        vm.info = res
      })
    }
  }
}
</script>