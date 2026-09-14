import { defineStore } from "pinia";
import {ref} from 'vue'

export const useAppStore = defineStore('app', () => {

  /** 全屏加载状态 */
  const globalLoading = ref(true)

  /** 设置全屏加载效果 */
  const setGlobalLoading = (bool: boolean) => {
    globalLoading.value = bool
  }

  return {
    globalLoading,
    setGlobalLoading
  }
})