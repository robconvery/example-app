import { createApp } from 'vue'
import App from './App.vue'

import { vuetify } from './plugins/vuetify'
import { pinia } from './stores'
import { router } from './router/index.js'

createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app')

