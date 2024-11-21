import axios, { AxiosError, type AxiosInstance } from 'axios'

import config from 'src/constants/config'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { LoginUserResponse } from 'src/types/user/user.api.type'
export const URL_LOGIN = 'user/login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN) {
          const data = response.data.data as LoginUserResponse
          this.accessToken = data?.accessToken
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data)
        }

        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(
            error.response?.status as number
          )
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
