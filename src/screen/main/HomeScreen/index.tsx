/* eslint-disable react-native/no-raw-text */
import React, { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTheme, StatusBar, Box, ScrollView } from 'native-base';
import { CategoryTitle, Image, OrderStatusItem, ProductItem, vScale, Liabilities } from '@src/components';
import { images } from '@src/assets';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themes } from '@src/utils';
import { SCREENS } from '@src/navigation';
import { useAuth } from '@src/queries';

import Header from './components/Header';

const HomeComponent = () => {
    const { colors } = useTheme();
    const [bgColor, setBgColor] = useState(colors.white);
    const [barStyle, setBarStyle] = useState<any>('light-content');
    const [heightOver, setHeightOver] = useState(vScale(160));
    const [heightImg, setHeightImt] = useState(0);
    const [products, setProducs] = useState<any>([]);

    const navigation = useNavigation();

    const navigateNotification = () => navigation.navigate(SCREENS.NOTIFICATION_SCREEN);

    const onLayout = (event: any) => setHeightOver(event.nativeEvent.layout.height);

    const onLoadImage = (event: any) => setHeightImt(event.nativeEvent.height);

    const onScroll = (event: any) => {
        const offSetTop = event.nativeEvent.contentOffset.y;
        if (offSetTop > heightImg) {
            setBgColor(colors.blue);
            setBarStyle('dark-content');
        } else {
            setBgColor(colors.white);
            setBarStyle('light-content');
        }
    };
    const navigateLiabilities = () => navigation.navigate(SCREENS.PERSONAL_LIABILITIES_SCREEN);

    const onPressAvatar = () => navigation.navigate(SCREENS.PERSONAL_TAB);

    // console.log('authData', authData);
    // const renderItem = ({ item, index }: any) => <ProductItem key={index} product={item} navigation={navigation} />;

    useEffect(() => {
        const time = setTimeout(() => {
            const data = [];
            for (let i = 0; i < 5; i++) {
                data.push({
                    id: i,
                    name: `Tôn Việt hàng poshaco az100 ${i + 1}`,
                    image: `https://picsum.photos/20${i}`,
                    price: 114980000,
                });
            }
            setProducs(data);
        }, 1000);

        return () => clearTimeout(time);
    }, []);

    return (
        <Box>
            <StatusBar backgroundColor={bgColor} barStyle={barStyle} />
            {/* <FCMService navigation={this.props.navigation} /> */}
            <ScrollView showsVerticalScrollIndicator={false} onScrollEndDrag={onScroll}>
                <Image onLoad={onLoadImage} source={images.header} style={styles.banner} placeholder>
                    <Header
                        onPressNotification={navigateNotification}
                        navigation={navigation}
                        onPressAvatar={onPressAvatar}
                    />
                </Image>
                <Box px={4} w='full' bg={colors.white}>
                    <Box
                        // showsVerticalScrollIndicator={false}
                        style={[styles.scroll, { marginTop: -(heightOver / 2) }]}
                    >
                        <Liabilities onLayout={onLayout} onPress={navigateLiabilities} style={styles.shadow} />
                        <Box mt={`${vScale(24)}px`}>
                            <Image source={images.agency} style={styles.hotline} />

                            <CategoryTitle
                                name='Trạng thái đơn hàng'
                                textMore='Xem thêm'
                                onPress={() => navigation.navigate(SCREENS.ORDER_TAB)}
                            />
                            <OrderStatusItem
                                style={styles.order}
                                onPressOrder={() => navigation.navigate(SCREENS.ORDER_DETAIL_SCREEN)}
                            />
                            <CategoryTitle name='Mặt hàng mới' textMore='Xem thêm' style={styles.marginTitle} />
                            {products &&
                                Array.isArray(products) &&
                                products.length > 0 &&
                                products.map((item, index) => (
                                    <ProductItem key={index} product={item} navigation={navigation} />
                                ))}
                            {/* <FlatList
                                data={products}
                                renderItem={renderItem}
                                keyExtractor={(item) => `${item.id}`}
                                ListEmptyComponent={<ListEmpty />}
                            /> */}
                        </Box>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    );
};

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: vScale(210),
    },
    scroll: {
        backgroundColor: themes.colors.white,
    },
    hotline: {
        width: '100%',
        height: vScale(104),
        marginBottom: vScale(24),
    },
    shadow: {
        shadowColor: themes.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    order: {
        marginBottom: vScale(12),
        paddingTop: 0,
    },
    marginTitle: {
        marginTop: vScale(24),
    },
});

export const HomeScreen = React.memo(HomeComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
