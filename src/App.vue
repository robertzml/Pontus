<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="isLogin" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" :width="220" app>
      <navigation-bar></navigation-bar>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dense color="blue darken-3">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLogin"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">海安润思达食品有限公司</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="isLogin">
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
      <v-container fluid>
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

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data: () => ({
    drawer: true
  }),
  computed: {
    ...mapGetters(['isLogin', 'alertMessage'])
  },
  methods: {
    ...mapActions(['initDict']),
    ...mapMutations(['getToken', 'alertClose']),
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  },
  mounted: function() {
    this.getToken()
    this.initDict()
  }
}
</script>
