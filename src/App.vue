<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="isLogin && userInfo.userGroupId < 6" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" :width="220" app>
      <navigation-bar></navigation-bar>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dense color="blue darken-3">
      <v-toolbar-title style="width: 300px" v-if="userInfo.userGroupId < 6" class="ml-0 pl-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLogin && userInfo.userGroupId < 6"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">海安润思达食品有限公司</span>
      </v-toolbar-title>
      <v-spacer v-if="userInfo.userGroupId < 6"></v-spacer>
      <v-chip color="transparent">
        {{ userInfo.name }}
      </v-chip>
      <v-btn icon v-if="isLogin" @click="toHome">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon v-if="isLogin">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="logout">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </template>
        <span>退出系统</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <v-container fluid style="height:50px;" class="px-4 pb-0" v-if="userInfo.userGroupId == 6">
        <forklift-menu></forklift-menu>
      </v-container>
      <v-container fluid class="px-1">
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-snackbar v-model="alertMessage.display" :color="alertMessage.color" :timeout="5000" right top>
      {{ alertMessage.text }}
      <v-btn color="pink" small text icon @click="alertClose">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NavigationBar from '@/components/NavigationBar'
import ForkliftMenu from '@/components/ForkliftMenu'

export default {
  name: 'App',
  components: {
    NavigationBar,
    ForkliftMenu
  },
  data: () => ({
    drawer: true
  }),
  computed: {
    ...mapGetters(['isLogin', 'userInfo', 'alertMessage'])
  },
  methods: {
    ...mapActions(['initDict']),
    ...mapMutations(['getToken', 'alertClose']),
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    },
    toHome() {
      this.$router.push({ name: 'home' })
    }
  },
  mounted: function() {
    this.getToken()
    this.initDict()
  }
}
</script>
