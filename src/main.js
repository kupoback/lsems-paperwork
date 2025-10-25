import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {globalStore} from '@stores/global'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

const store = globalStore()
store.loadUserData()

app.mount('#app')
