import { API, setHeader } from '@src/config';
import { LoginParams, PostsParams } from './type.props';
import queryString from 'query-string';

export default {
    prifole: (token: string) => API.get(`user/profile`, setHeader(token)),
};
