<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn :disabled="selectedUser.length == 0" text @click.stop="showEdit">编辑用户</v-btn>
          <v-btn text @click.stop="showCreate">添加用户</v-btn>
          <v-btn text @click.stop="enableUser">启用</v-btn>
          <v-btn text @click.stop="disableUser">禁用</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="orange"> 用户列表 </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="userList" :items-per-page="10" v-model="selectedUser" show-select single-select disable-sort>
            <template v-slot:[`item.userGroupId`]="{ item }">
              {{ item.userGroupId | userGroupName }}
            </template>
            <template v-slot:[`item.lastLoginTime`]="{ item }">
              {{ item.lastLoginTime | displayDateTime }}
            </template>
            <template v-slot:[`item.currentLoginTime`]="{ item }">
              {{ item.currentLoginTime | displayDateTime }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
              {{ item.status | displayStatus }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <user-edit ref="userEditMod" @update="loadUser"></user-edit>
      <user-create ref="userCreateMod" @update="loadUser"></user-create>
    </v-col>
  </v-row>
</template>

<script>
import user from '@/controllers/user'
import userGroup from '@/controllers/userGroup'
import UserEdit from './Edit'
import UserCreate from './Create'

export default {
  name: 'UserIndex',
  components: {
    UserEdit,
    UserCreate
  },
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
      user.getList().then((res) => {
        vm.userList = res
      })
    },
    loadUserGroup() {
      let vm = this
      userGroup.getList().then((res) => {
        vm.userGroupList = res
      })
    },

    refresh() {
      this.loadUser()
    },

    enableUser() {
      if (this.selectedUser.length == 0) {
        return
      }

      user.enable({ id: this.selectedUser[0].id, enable: true }).then(() => {
        this.loadUser()
      })
    },

    disableUser() {
      if (this.selectedUser.length == 0) {
        return
      }

      user.enable({ id: this.selectedUser[0].id, enable: false }).then(() => {
        this.loadUser()
      })
    },

    showCreate() {
      this.$refs.userCreateMod.init()
    },

    showEdit() {
      if (this.selectedUser.length == 0) {
        return
      }

      this.$refs.userEditMod.init(this.selectedUser[0].id)
    }
  },
  mounted: function () {
    this.loadUserGroup()
    this.loadUser()
  }
}
</script>
