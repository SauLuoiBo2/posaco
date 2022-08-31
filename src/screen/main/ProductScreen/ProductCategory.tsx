import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, FlatList, ScrollView, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { HeaderBar, ListEmpty, ProductItem, scale, vScale } from '@src/components';
import { themes } from '@src/utils';

const ProductCategoryComponent = () => {
    const navigation = useNavigation();
    const { colors, fonts } = useTheme();
    const [products, setProducts] = useState<any>([]);

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
            setProducts(data);
        }, 1000);

        return () => clearTimeout(time);
    }, []);

    const renderItem = ({ item, index }: any) => <ProductItem key={index} product={item} navigation={navigation} />;

    return (
        <Box safeArea flex={1} bg={colors.white}>
            <HeaderBar title='Sản phẩm mới' navigation={navigation} styleContent={styles.headerContainer} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box pt={`${vScale(16)}`} px={`${scale(16)}`}>
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={(item) => `${item.id}`}
                        ListEmptyComponent={<ListEmpty />}
                    />
                </Box>
            </ScrollView>
        </Box>
    );
};

export const ProductCategoryScreen = React.memo(ProductCategoryComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({
    // SafeAreaView: {
    //     flex: 1,
    //     backgroundColor: themes.colors.white,
    // },
    headerContainer: {
        borderBottomWidth: 0,
        marginTop: vScale(16),
    },
});
