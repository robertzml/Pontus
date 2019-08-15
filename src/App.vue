<template>
  <v-app id="inspire">
    <navigation-bar :drawer="drawer"></navigation-bar>

    <header-bar :drawer.sync="drawer"></header-bar>

    <v-content>
      <v-container fluid grid-list-md>
        <router-view></router-view>
        <v-snackbar v-model="alertMessage.display" :color="alertMessage.color" :timeout="5000" right top>
          {{ alertMessage.text }}
          <v-btn color="pink" small text icon @click="alertClose">
            <v-icon>close</v-icon>
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import HeaderBar from '@/components/HeaderBar'
import NavigationBar from '@/components/NavigationBar'

export default {
  name: 'App',
  components: {
    HeaderBar,
    NavigationBar
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters(['alertMessage'])
  },
  methods: {
    ...mapMutations(['alertClose'])
  },
  mounted: function() {}
}
</script>
