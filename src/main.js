import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
