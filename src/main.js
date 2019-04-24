// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import LoadScript from 'vue-plugin-load-script';

import App from './App';
import Img2x from './components/Img2x'

Vue.config.productionTip = false;

Vue.component('img2x', Img2x);
Vue.use(LoadScript);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
