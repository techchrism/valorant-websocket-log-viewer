import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    render: function(h)
    {
        return h(App);
    }
}).$mount('#app');
