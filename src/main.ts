import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios' // Import AxiosInstance type
import VueAxios from 'vue-axios'
import { axiosInstances } from './services/dataService'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Provide axios and axiosInstances to VueAxios separately
app.use(VueAxios, axios) // Pass axios as a parameter

// Provide secured and plain Axios instances separately
app.provide('securedAxiosInstance', axiosInstances.secured)
app.provide('plainAxiosInstance', axiosInstances.plain)

app.mount('#app')
