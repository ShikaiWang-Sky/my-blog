import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import axios from 'axios'

const app = createApp(App)
app
  .use(store)
  .use(router)
  .mount('#app')
app.use(ElementPlus)

app.config.globalProperties.$axios = axios
