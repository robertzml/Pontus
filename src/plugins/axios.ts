import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import config from './config'

const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  withCredentials: false, // 允许跨域 cookie
  headers: { 'Content-Type': 'application/json' }
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error) => {
    alert('网络请求出错')
    return Promise.resolve(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    alert('请求超时或服务器异常')
    return Promise.resolve(error)
  }
)

export default service
