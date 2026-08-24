import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import httpStatus from '@/types/http-status'
import {ElMessage} from 'element-plus'
import type { ApiResult, PageResult } from "@/api/common";


const request = axios.create({
  baseURL: '',
  timeout: 5000
})

request.interceptors.request.use(res => {
  console.info('请求拦截config ', res)
  return res
})

request.interceptors.response.use(
  (response: AxiosResponse<ApiResult>): AxiosResponse | any => {
  console.info('响应拦截config ', response)
  const {code, data, msg} = response.data as ApiResult
  if (code === httpStatus?.failed?.code) {
    ElMessage.error(msg || "请求失败")
  }
  return data
})

export default request