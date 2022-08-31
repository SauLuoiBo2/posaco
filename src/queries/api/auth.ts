import { API, setHeader } from '@src/config';
import { LoginParams, PostsParams } from './type.props';
import queryString from 'query-string';

export default {
    login: (data: LoginParams) => API.post(`auth/login`, data),
    register: (data: LoginParams) => API.post(`auth/register`, data),
};
