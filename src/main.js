import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from '@/store/store'
Vue.config.productionTip = false
Vue.use(vuetify, {
    rtl: true
})

import VueRouter from 'vue-router'
import router from './router'
import('./assets/style/font.css')
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.component('Loading', Loading)

Vue.use(VueRouter)
import VueSlider from 'vue-slider-component';
Vue.component('VueSlider', VueSlider);
import 'vue-slider-component/theme/default.css';
// Import stylesheet
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
new Vue({
  vuetify,
  router,
    store,
  render: h => h(App)
}).$mount('#app')
