
import axios from 'axios';

const API_URL = 'http://localhost:3000'

const securedAxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'Application/json'
    }
});

const plainAxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'Application/json'
    }
});

// // Add a request interceptor
// http.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// http.interceptors.response.use(function (response) {
//     // Do something with successful response
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });

import type { AxiosRequestHeaders } from 'axios';

securedAxiosInstance.interceptors.request.use(config => {
    const method = config.method?.toUpperCase() ?? 'GET';
    if (method !== 'OPTIONS' && method !== 'GET') {
        // Ensure that 'X-CRFS-TOKEN' is of type string
        const csrfToken = localStorage.csrf || '';

        // Make sure to copy existing headers and only add/modify 'X-CRFS-TOKEN'
        const modifiedHeaders = {
            ...config.headers,
            'X-CRFS-TOKEN': csrfToken
        };
        config.headers = modifiedHeaders as unknown as AxiosRequestHeaders; // Convert to unknown first
    }
    return config;
});


securedAxiosInstance.interceptors.response.use(null, error => {
    if (error.resposponse && error.response.config && error.response.status === 401) {
        return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CRFS-TOKEN': localStorage.csrf } })
            .then(response => {
                localStorage.csrf = response.data.csrf;
                localStorage.signedIn = true;

                const retryConfig = error.response.config
                retryConfig.headers['X-CRFS-TOKEN'] = localStorage.csrf
                return plainAxiosInstance.request(retryConfig)
            }).catch(error => {
                delete localStorage.csrf
                delete localStorage.signedIn

                location.replace('/')
                return Promise.reject(error)
            })
    } else {
        return Promise.reject(error)
    }
})

export const axiosInstances = {
    secured: securedAxiosInstance,
    plain: plainAxiosInstance
};


class DataService {
    getAll() {
        return securedAxiosInstance.get('/candidates');
    }

    get(id: string) {
        return securedAxiosInstance.get(`/candidate/${id}`);
    }

    create(data: any) {
        return securedAxiosInstance.post('/candidate', data);
    }

    update(id: string, data: any) {
        return securedAxiosInstance.put(`/candidate/${id}`, data);
    }

    delete(id: string) {
        return securedAxiosInstance.delete(`/candidate/${id}`);
    }
}

export default new DataService();