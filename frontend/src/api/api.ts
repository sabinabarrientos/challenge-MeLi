import axios, { AxiosRequestConfig } from 'axios';

const apiUrl = 'http://localhost:4000';

const config: AxiosRequestConfig = {
    baseURL: apiUrl
};

const api = axios.create( config );

export const getUrl = {
    defaultItems: '/items',
    searchItems: ( query: string ): string => `/items?q=${query}`,
    itemDetail: ( id: string ): string => `/items/${id}`
};

export default api;
