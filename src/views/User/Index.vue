<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text>添加用户</v-btn>
          <v-btn text @click.stop="enableUser">启用</v-btn>
          <v-btn text>禁用</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>
      <v-card dark>
        <v-card-title class="orange">
          用户列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="userList" :items-per-page="10" v-model="selectedUser" show-select single-select disable-sort>
            <template v-slot:item.userGroupId="{ item }">
              {{ userGroupList.find(r => r.id == item.userGroupId).title }}
            </template>
            <template v-slot:item.lastLoginTime="{ item }">
              {{ item.lastLoginTime | displayDateTime }}
            </template>
            <template v-slot:item.currentLoginTime="{ item }">
              {{ item.currentLoginTime | displayDateTime }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status | displayStatus }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'UserIndex',
  data: () => ({
    userList: [],
    userGroupList: [],
    headers: [
      { text: 'Id', value: 'id', align: 'left' },
      { text: '用户名', value: 'userName' },
      { text: '用户组', value: 'userGroupId' },
      { text: '姓名', value: 'name' },
      { text: '上次登录时间', value: 'lastLoginTime' },
      { text: '本次登录时间', value: 'currentLoginTime' },
      { text: '备注', value: 'remark' },
      { text: '状态', value: 'status' }
    ],
    selectedUser: []
  }),
  methods: {
    loadUser() {
      let vm = this
      this.$store.dispatch('getUserList').then(res => {
        vm.userList = res
      })
    },
    loadUserGroup() {
      let vm = this
      this.$store.dispatch('getUserGroupList').then(res => {
        vm.userGroupList = res
      })
    },

    enableUser() {
      if (this.selectedUser.length == 0) {
        return
      }

      this.$store
        .dispatch('enableUser', { id: this.selectedUser[0].id, enable: true })
        .then(res => {
          console.log(res)
        })
    }
  },
  mounted: function() {
    this.loadUserGroup()
    this.loadUser()
  }
}
</script>
