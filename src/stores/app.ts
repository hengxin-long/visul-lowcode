import { defineStore } from "pinia";
import {ref} from 'vue'

export const useAppStore = defineStore('app', () => {

  /** 路由跳转全屏加载状态 */
  const globalLoading = ref(true)

  /** 设置路由跳转全屏加载效果 */
  const setGlobalLoading = (bool: boolean) => {
    globalLoading.value = bool
  }

  /** 表单提交全屏加载状态 */
  const fullscreenLoading  = ref<boolean>(false)

  /** 设置表单提交全屏加载效果 */
  const setFullscreenLoading = (bool: boolean) => {
    fullscreenLoading.value = bool
  }

  return {
    globalLoading,
    fullscreenLoading,
    setGlobalLoading,
    setFullscreenLoading
  }
})