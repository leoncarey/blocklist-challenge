import { createApp } from 'vue'
import App from './App.vue'

import { maska } from 'maska'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@element-plus/icons-vue'
import './style.css'

const app = createApp(App)

app.use(ElementPlus)
app.directive('maska', maska)
app.mount('#app')
