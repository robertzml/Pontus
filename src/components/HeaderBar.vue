<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dense color="blue darken-3" dark>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <v-app-bar-nav-icon @click.stop="expand"></v-app-bar-nav-icon>
      <span class="hidden-sm-and-down">海安润思达食品有限公司</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="16px" item>
        <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {
    drawer: Boolean
  },
  data() {
    return {};
  },
  methods: {
    expand: function() {
      let show = !this.drawer;
      this.$emit("update:drawer", show);
    }
  }
};
</script>
