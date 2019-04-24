// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import LoadScript from 'vue-plugin-load-script';

import App from './App';
import Img2x from './components/Img2x'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(LoadScript);
Vue.component('img2x', Img2x);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
