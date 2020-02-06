<template>
  <v-row dense>
    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <keep-alive>
          <component v-bind:is="gridTab"></component>
        </keep-alive>
      </v-slide-x-transition>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import StoreList from './List'
import StoreDetails from './Details'

export default {
  name: 'StoreGrid',
  components: {
    StoreList,
    StoreDetails
  },
  data: () => ({}),
  computed: {
    ...mapState({
      gridTab: state => state.store.gridTab,
      refreshEvent: state => state.store.refreshEvent
    })
  }
}
</script>
