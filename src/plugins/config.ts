const config = {
  baseUrl: process.env.NODE_ENV == 'development' ? 'https://localhost:44328/api' : 'http://192.168.16.245:8000/api'
}

export default config
