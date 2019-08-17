import axios from 'axios'

const ax = axios.create({
  baseURL: 'https://localhost:44328/api',
  timeout: 5000,
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
    alert('载入失败')
  }
}

// post
export const _post = async req => {
  try {
    const res = await ax.post(req.url, req.data)
    return res
  } catch (err) {
    console.log(err)
    alert('载入失败')
  }
}
