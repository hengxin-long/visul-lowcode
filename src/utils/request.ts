
import axios from 'axios'

const request = axios.create({
  baseURL: '',
  timeout: 5000
})

request.interceptors.request.use(res => {
  console.log('请求拦截config ', res)
  return res
})

request.interceptors.response.use(res => {
  console.log('响应拦截config ', res.data)
  return res.data
})

export default request