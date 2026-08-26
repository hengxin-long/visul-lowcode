import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { ApiCodeEnum } from "@/enums/api";
import {ElMessage} from 'element-plus'
import type { ApiResult } from "@/api/common";


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
  if (code === ApiCodeEnum.NOT_FOUND || code === ApiCodeEnum.BAD_REQUEST) {
    ElMessage.error(msg || "请求失败")
  }
  return data
})

export default request