import { API_URL_DEV, API_URL_PRODUCTION, DEVELOPMENT, ELocalStorageKey, ResponseCode } from '../constants'
import { EventBusName, onPushEventBusHandler } from '@/services'
import axios from 'axios'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const timeout = 30 * 1000

const baseURL = DEVELOPMENT === 'production' ? API_URL_PRODUCTION : API_URL_DEV

export const client = axios.create({
  baseURL,
  headers,
  timeout
})

const requestInterceptor = async (config: any) => {
  const rawToken = localStorage.getItem(ELocalStorageKey.AccessToken)
  let customConfig = null

  if (rawToken) {
    customConfig = {
      ...config,
      headers: {
        Authorization: `Bearer ${JSON.parse(rawToken)}`
      }
    }
  } else {
    customConfig = config
  }

  return customConfig
}

const errorResponseInterceptor = async (error: any) => {
  const { response } = error
  const statusCode = response?.status
  if (statusCode === ResponseCode.UNAUTHORIZED || statusCode === ResponseCode.TOKEN_REMOVED) {
    onPushEventBusHandler({
      type: EventBusName.Logout
    })

    return Promise.reject({ ...error })
  }

  return Promise.reject({ ...error })
}

client.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error)
})

client.interceptors.request.use((response) => {
  return response
}, errorResponseInterceptor)
