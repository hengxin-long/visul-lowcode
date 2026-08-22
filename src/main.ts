import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入全局样式
import './styles/common.scss'
// 只引入el-message组件样式，避免和定制主题色冲突
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
