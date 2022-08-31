import React from 'react';
import isEqual from 'react-fast-compare';
import { Box, FlatList, Text } from 'native-base';
import { useQuery } from 'react-query';
import logger from '@src/utils/common/logger';
import { ActivityIndicator, ListRenderItemInfo } from 'react-native';
import { ACCESS_TOKEN, POSTS, posts, useToken } from '@src/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const postItem = ({ item }: ListRenderItemInfo<any>) => (
    <Box safeArea px={2} key={item?.id}>
        <Text fontSize='lg'>{item?.title}</Text>
    </Box>
);

const ListComponent = () => {
    const { data: token } = useToken();
    logger.debug('token', token);
    const fetchData = async () => {
        const params = {
            page: 1,
            perPage: 10,
        };
        const { data } = await posts.getPosts(params);
        logger.debug('data', data);
        return data?.data;
    };

    const { status, data, error, isFetching } = useQuery(POSTS, fetchData);

    const onReachEndofScroll = async () => {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
    };

    return (
        <Box safeArea px={2}>
            <Text fontSize='xl'>List Screen</Text>
            {isFetching && <ActivityIndicator />}
            {data && (
                <FlatList
                    data={data}
                    renderItem={postItem}
                    keyExtractor={(item) => item.id}
                    onEndReached={onReachEndofScroll}
                    onEndReachedThreshold={0.5}
                />
            )}
        </Box>
    );
};

export const ListScreen = React.memo(ListComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
