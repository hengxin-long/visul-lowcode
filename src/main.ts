import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入全局样式
import './styles/common.scss'
// 只引入el-message组件样式，避免和定制主题色冲突
import 'element-plus/theme-chalk/el-message.css'
import ElementPlus from 'element-plus'
// 中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

// 将组件语言注册为中文
app.use(ElementPlus, {
  locale: zhCn
})
app.use(createPinia())
app.use(router)

app.mount('#app')
