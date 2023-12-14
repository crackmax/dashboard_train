<template>
  <v-app>
    <v-main>
      <MainPage/>
      <!-- <LocationMap/> -->
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import LocationMap from './components/LocationMap';
import MainPage from './views/MainPage';

export default {
  name: 'App',

  components: {
    MainPage,
    // LocationMap,
  },

  data: () => ({
    //
  }),
};
</script>
