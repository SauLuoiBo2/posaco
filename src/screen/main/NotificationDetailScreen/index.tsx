import React, { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Container, ScrollView, useTheme, useToast, Text, StatusBar } from 'native-base';
import { CategoryTitle, HeaderBar, Image, ListEmpty, Loading, ProductItem, scale, vScale } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import logger from '@src/utils/common/logger';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import { StyleSheet, useWindowDimensions } from 'react-native';

const NotificationDetailComponent = (props: any) => {
    const { route } = props;
    const { colors } = useTheme();
    const toast = useToast();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const { width } = useWindowDimensions();

    logger.debug('data', data);
    const goBack = () => navigation.goBack();

    useEffect(() => {
        const payload = route?.params?.payload;
        const payloadType = typeof payload;
        if (payloadType === 'object') {
            setData({ data: payload, loading: false });
        } else {
            toast.show({
                description: 'Lỗi. Xin thử lại !',
            });
        }
    }, []);

    return loading ? (
        <Box safeArea mt={16}>
            <Box mt={16} />
            <Loading />
        </Box>
    ) : (
        <Box safeArea>
            <HeaderBar navigation={navigation} onPressLeft={goBack} />
            {data ? (
                <ScrollView m={`${scale(12)}px`} showsVerticalScrollIndicator={false}>
                    <Text fontSize={24} fontWeight='bold' color={colors.dark} mb={`${vScale(16)}px`} lineHeight={35}>
                        {data?.data?.title}
                    </Text>
                    <Text fontSize={16} mb={`${vScale(24)}px`} color={colors.darkGrey}>
                        {moment(data?.data?.createdAt * 1000).format('HH:MM DD/MM/YYYY')}
                    </Text>
                    <RenderHTML
                        contentWidth={width}
                        // renderers={{
                        //     img: (htmlAttribs, index) => {
                        //         if (htmlAttribs && htmlAttribs.src) {
                        //             return (
                        //                 <Image
                        //                     key={index}
                        //                     style={styles.imgHTML}
                        //                     source={{ uri: htmlAttribs.src }}
                        //                     placeholder
                        //                 />
                        //             );
                        //         }
                        //     },
                        // }}
                        source={{ html: data?.data?.content }}
                    />
                    <CategoryTitle name='Sản phẩm khuyến mãi' textMore={' '} />
                    <ProductItem product={product} navigation={navigation} />
                </ScrollView>
            ) : (
                <ListEmpty />
            )}
        </Box>
    );
};

const product = {
    id: 123,
    name: 'Tôn Việt hàng poshaco az100',
    image: 'https://picsum.photos/208',
    price: 780000,
};
// const styles = StyleSheet.create({
//     imgHTML: {
//         width: scale(343),
//         height: scale(343) / 1.78,
//         alignSelf: 'center',
//     },
// });

export const NotificationDetailScreen = React.memo(NotificationDetailComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);
