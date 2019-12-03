import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);


export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#f88109',
                success: '#f88109',
            }
        },
    },
})