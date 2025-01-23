import './assets/tailwind.css'

import { createApp } from 'vue'

import App from './App.vue'

document.documentElement.classList.add('dark')

const app = createApp(App)

app.mount('#app')
