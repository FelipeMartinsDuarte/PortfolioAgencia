import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---
import VueCookies from 'vue-cookies'


import "bootstrap/dist/js/bootstrap.js"
import 'bootstrap/dist/css/bootstrap.css'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'

const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(VueTheMask);
app.use(money, {precision: 4});
app.use(VueCookies, { expires: '1h'})