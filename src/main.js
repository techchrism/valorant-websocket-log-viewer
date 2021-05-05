import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Vuetify from 'vuetify/lib/framework';
import localforage from 'localforage';

Vue.config.productionTip = false;
Vue.use(Vuetify);

localforage.getItem('theme').then(theme =>
{
    if(!theme)
    {
        theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    
    new Vue({
        vuetify: new Vuetify({
            theme: {
                dark: theme !== 'light'
            }
        }),
        store,
        render: function(h)
        {
            return h(App);
        }
    }).$mount('#app');
});
