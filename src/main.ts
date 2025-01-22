import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

document.documentElement.classList.add('dark')

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
