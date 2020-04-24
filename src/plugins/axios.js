import axios from 'axios'
import config from './config'

const ax = axios.create({
  baseURL: config.baseURL,
  timeout: 10000,
  withCredentials: false, // 允许跨域 cookie
  headers: { 'Content-Type': 'application/json' }
})

// get
export const _get = async req => {
  try {
    const res = await ax.get(req.url, { params: req.params })
    return res
  } catch (err) {
    console.log(err)
    alert('网络请求出错')
  }
}

// post
export const _post = async req => {
  try {
    const res = await ax.post(req.url, req.data)
    return res
  } catch (err) {
    console.log(err)
    alert('网络请求出错')
  }
}

export const _postqs = async req => {
  try {
    const res = await ax.post(req.url, null, { params: req.params })
    return res
  } catch (err) {
    console.log(err)
    alert('网络请求出错')
  }
}
