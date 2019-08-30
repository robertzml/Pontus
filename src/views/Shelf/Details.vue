<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          客户信息
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <v-flex md3>
                <v-text-field v-model="shelfInfo.number" label="编号" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field :value="$util.shelfType(shelfInfo.type)" label="类型" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="shelfInfo.entrance" label="入口数" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="shelfInfo.telephone" label="电话" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="shelfInfo.contact" label="联系人" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="shelfInfo.contactTelephone" label="联系人电话" readonly></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field v-model="shelfInfo.remark" label="备注" readonly></v-text-field>
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
  name: 'ShelfDetails',
  data: () => ({
    shelfId: 0,
    shelfInfo: {}
  }),
  methods: {
    getInfo(id) {
      this.shelfId = id
      if (this.shelfId == 0) {
        return
      }

      let vm = this
      this.$store.dispatch('getShelf', id).then(res => {
        vm.shelfInfo = res
      })
    }
  }
}
</script>
