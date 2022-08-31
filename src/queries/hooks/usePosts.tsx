import { useQuery } from 'react-query';
import logger from '@src/utils/common/logger';
import { POSTS, posts } from '@src/queries';

const fetchPosts = async () => {
    const { data } = await posts.getPosts({ page: 1, perPage: 10 });
    logger.debug('data', data);
    return data;
};

export default function usePosts() {
    return useQuery(POSTS, fetchPosts);
}
