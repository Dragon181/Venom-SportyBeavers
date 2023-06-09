import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { openModal } from '../../components/modal/Modal'
import { closePreloader } from '../../ui-kit/preloader/Preloader'

export interface ISportyRequest {
    readonly method: 'GET' | 'POST' | 'PUT'
    readonly path: string
    readonly data?: any
    readonly headers?: AxiosRequestConfig['headers']
    readonly params?: AxiosRequestConfig['params']
}

export class SportyApi<T> {
    private readonly baseUrl = 'https://venom-api.sportybeavers.com/'

    async request(conf: ISportyRequest): Promise<T> {
        return axios.request<T>(
            this.getRequestConfig(conf)
        )
            .then((response) => {
                return response.data
            })
            .catch((error: AxiosError) => {
                openModal('error-modal')
                throw new Error(error.message)
            })
            .finally(() => {
                closePreloader()
            })
    }

    private getRequestConfig(conf: ISportyRequest): AxiosRequestConfig {
        const requestConfig: AxiosRequestConfig = {
            method: conf.method,
            url: this.baseUrl + conf.path,
            validateStatus: function (status) {
                return status < 504
            }
        }
        if (typeof conf.headers === 'undefined') {
            requestConfig.headers = {
                'Content-Type': 'application/json',
            }
        } else {
            requestConfig.headers = conf.headers
        }

        if (conf.hasOwnProperty('params')) requestConfig.params = conf.params

        if (conf.hasOwnProperty('data')) requestConfig.data = conf.data
        return requestConfig
    }
}