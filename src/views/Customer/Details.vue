<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          客户信息
          <v-spacer></v-spacer>
          <v-btn outlined @click="backToList">
            <v-icon left>arrow_back</v-icon>
            返回
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <v-flex md3>
                <v-text-field v-model="info.number" label="客户编号" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.name" label="客户名称" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.address" label="地址" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.telephone" label="电话" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.contact" label="联系人" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.contactTelephone" label="联系人电话" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field :value="customerType(info.type)" label="客户类型" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="info.remark" label="备注" readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined color="warning" @click.stop="showEditMod">编辑</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <customer-edit ref="customerEditMod" @update="getInfo(customerId)"></customer-edit>

    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="green">
          合同信息
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CustomerEdit from '@/components/Customer/Edit'

export default {
  name: 'CustomerDetails',
  components: {
    CustomerEdit
  },
  data: () => ({
    customerId: 0,
    info: {}
  }),
  computed: {
    ...mapGetters(['customerType'])
  },
  methods: {
    ...mapMutations(['alertInfo', 'alertError']),
    getInfo(id) {
      this.customerId = id
      if (this.customerId == 0) {
        return
      }

      let vm = this
      this.$axios
        .get('/customer/get', { params: { id: this.customerId } })
        .then(function(res) {
          vm.info = res.data
        })
        .catch(function(error) {
          console.log(error)
          vm.alertError('载入失败')
        })
    },
    showEditMod() {
      this.$refs.customerEditMod.init(this.customerId)
    },
    backToList() {
      this.$emit('toList')
    }
  },
  activated: function() {}
}
</script>