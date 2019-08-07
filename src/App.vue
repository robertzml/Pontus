<template>
  <v-app id="inspire">
    <navigation-bar :drawer="drawer"></navigation-bar>

    <header-bar :drawer.sync="drawer"></header-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-btn>Button</v-btn>
        </v-layout>
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
