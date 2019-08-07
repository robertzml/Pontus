<template>
  <v-app id="inspire">
    <navigation-bar :drawer="drawer"></navigation-bar>

    <header-bar :drawer.sync="drawer"></header-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import NavigationBar from "@/components/NavigationBar"

export default {
  name: "App",
  components: {
    HeaderBar,
    NavigationBar
  },
  data: () => ({
    //
    drawer: false
  }),
  methods: {
  }
};
</script>
