import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import 'bootstrap/dist/js/bootstrap.bundle.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(BootstrapVue)
// app.use(IconsPlugin)

app.mount('#app')
