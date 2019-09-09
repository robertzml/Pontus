<template>
  <v-app id="inspire" v-if="isLogin">
    <navigation-bar :drawer="drawer"></navigation-bar>
    <header-bar :drawer.sync="drawer"></header-bar>

    <v-content>
      <v-container fluid class="grid-list-md">
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
  <v-app id="login" v-else>
    <login></login>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import HeaderBar from '@/components/HeaderBar'
import NavigationBar from '@/components/NavigationBar'
import Login from '@/components/Login'

export default {
  name: 'App',
  components: {
    HeaderBar,
    NavigationBar,
    Login
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters(['isLogin', 'alertMessage'])
  },
  methods: {
    ...mapActions(['initDict']),
    ...mapMutations(['getToken', 'alertClose'])
  },
  mounted: function() {
    this.getToken()
    this.initDict()
  }
}
</script>
