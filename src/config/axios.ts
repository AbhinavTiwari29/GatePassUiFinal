import axios, { InternalAxiosRequestConfig } from 'axios';
import { BACKEND_BASE_URL } from '.';

const axiosInstance = axios.create({
    baseURL: "http://172.16.15.42:5500",
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        console.log(config);
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 500) {
            // redirect to error page
        }
        return Promise.reject(
            (error.response && error.response.data) || 'Something went wrong',
        );
    },
);

export default axiosInstance;
