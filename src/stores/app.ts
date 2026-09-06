import { defineStore } from "pinia";
import {ref} from 'vue'

export const useAppStore = defineStore('app', () => {

  const globalLoading = ref(true)

  const setGlobalLoading = (bool: boolean) => {
    globalLoading.value = bool
  }

  return {
    globalLoading,
    setGlobalLoading
  }
})