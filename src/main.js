//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import electronCommunicator from './database/electronCommunicator'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(electronCommunicator)

app.mount('#app')
