<template>
  <div class="main-container">
    <NavigationDrawer />
    <AnalysisWindow />
  </div>
</template>

<script>
import NavigationDrawer from '../components/NavigationDrawer';
import AnalysisWindow from '../components/AnalysisWindow';

export default {
  name: 'MainPage',

  components: {
    NavigationDrawer,
    AnalysisWindow,
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100vh; /* Adjust the height as needed */
}
</style>
