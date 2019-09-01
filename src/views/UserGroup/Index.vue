<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>用户组管理</v-toolbar-title>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>
      <v-simple-table>
        <thead>
          <tr class="red lighten-1">
            <th class="text-left">Id</th>
            <th class="text-left">代码</th>
            <th class="text-left">名称</th>
            <th class="text-left">级别</th>
            <th class="text-left">备注</th>
            <th class="text-left">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userGroupData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.rank }}</td>
            <td>{{ item.remark }}</td>
            <td>{{ item.status | displayStatus }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'UserGroupIndex',
  data: () => ({
    userGroupData: []
  }),
  methods: {
    loadUserGroup() {
      let vm = this
      this.$store.dispatch('getUserGroupList').then(res => {
        vm.userGroupData = res
      })
    }
  },
  mounted: function() {
    this.loadUserGroup()
  }
}
</script>