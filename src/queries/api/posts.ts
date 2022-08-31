import { API, setHeader } from '@src/config';
import queryString from 'query-string';

import { PostsParams } from './type.props';

export default {
    getPosts: (params: PostsParams) => API.get(`news/list?${queryString.stringify(params)}`),
};
