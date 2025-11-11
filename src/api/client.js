import axios from 'axios'

const BASE_URL = process.env.REACT_APP_ROLLING_API_BASE_URL || 'https://rolling-api.vercel.app/'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
