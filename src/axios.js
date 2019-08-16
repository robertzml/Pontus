import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:44328/api'
axios.defaults.withCredentials = false // 允许跨域 cookie
axios.defaults.headers = {
  'Content-Type': 'application/json'
}

export default axios
