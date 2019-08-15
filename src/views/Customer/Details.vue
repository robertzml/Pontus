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
            </v-layout>
          </v-form>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CustomerDetails',
  data: () => ({
    customerId: 0,
    info: {}
  }),
  methods: {
    ...mapMutations([
      'alertInfo', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      'alertError'
    ]),
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
    backToList() {
      this.$emit('toList')
    }
  },
  activated: function() {}
}
</script>