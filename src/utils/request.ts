
import axios from 'axios'
import httpStatus from '@/types/http-status'
import {ElMessage} from 'element-plus'

const request = axios.create({
  baseURL: '',
  timeout: 5000
})

request.interceptors.request.use(res => {
  console.info('请求拦截config ', res)
  return res
})

request.interceptors.response.use(res => {
  console.info('响应拦截config ', res)
  const {code, msg} = res.data
  if (code === httpStatus?.failed?.code) {
    ElMessage.error(msg || "请求失败")
  }
  return res.data
})

export default request