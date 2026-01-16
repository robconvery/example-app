import { createApp } from 'vue'
import App from './App.vue'

import { vuetify } from './plugins/vuetify'
import { pinia } from './stores'
import { router } from './router'

const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.use(router)

const initialPath =
    (window as any).__INITIAL_PATH__ ?? window.location.pathname

router.replace(initialPath).catch(() => {
    // ignore NavigationDuplicated / same-route replaces etc.
})

router.isReady().then(() => {
    app.mount('#app')
})
