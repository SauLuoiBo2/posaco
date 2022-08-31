import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const defaultConfig: AxiosRequestConfig = {
    baseURL: Config.API_URL,
    timeout: Number(Config.TIME_OUT),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export const API = axios.create(defaultConfig);

export const setHeader = (token?: string, ...arg: any) => {
    if (!token) return { headers: { ...arg } };
    return { headers: { Authorization: `Bearer ${token}`, ...arg } };
};
