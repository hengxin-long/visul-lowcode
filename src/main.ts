import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 全局样式
import './styles/common.scss'
import ElementPlus from 'element-plus'
// 中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 覆盖element plus组件默认样式，定制主题色
import '@/styles/element/element-override.scss'
// 全局注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 将组件语言注册为中文
app.use(ElementPlus, {
  locale: zhCn
})
app.use(createPinia())
app.use(router)

app.mount('#app')
