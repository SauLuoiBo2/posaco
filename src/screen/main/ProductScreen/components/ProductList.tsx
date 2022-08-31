import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, useTheme } from 'native-base';
import { CategoryTitle, ListEmpty, ProductItem, scale, vScale } from '@src/components';
import { SCREENS } from '@src/navigation';

const ProductList = ({ navigation, tabLabel }: any) => {
    const { colors } = useTheme();
    const [products, setProducs] = useState<any>([]);

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

    const handleViewMore = () => navigation.navigate(SCREENS.PRODUCT_CATEGORY_SCREEN);

    const renderItem = ({ item, index }: any) => <ProductItem key={index} product={item} navigation={navigation} />;

    return (
        <ScrollView showsVerticalScrollIndicator={false} px={`${scale(16)}px`} bg={colors.white}>
            <CategoryTitle
                name='Sản phẩm mới'
                textMore='Xem thêm'
                style={styles.marginTitleFirst}
                onPress={handleViewMore}
            />
            {products.length > 0 &&
                products.map((item: any, index: React.Key | null | undefined) => (
                    <ProductItem key={index} product={item} navigation={navigation} />
                ))}
            <CategoryTitle
                name='Sản phẩm bán chạy'
                textMore='Xem thêm'
                style={styles.marginTitle}
                onPress={handleViewMore}
            />
            {products.length > 0 &&
                products.map((item: any, index: React.Key | null | undefined) => (
                    <ProductItem key={index} product={item} navigation={navigation} />
                ))}
            <CategoryTitle
                name='Tất cả sản phẩm'
                textMore='Xem thêm'
                style={styles.marginTitle}
                onPress={handleViewMore}
            />
            {products.length > 0 &&
                products.map((item: any, index: React.Key | null | undefined) => (
                    <ProductItem key={index} product={item} navigation={navigation} />
                ))}
        </ScrollView>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    marginTitle: {
        marginTop: vScale(24),
        marginBottom: vScale(12),
    },
    marginTitleFirst: {
        marginTop: vScale(18),
        marginBottom: vScale(12),
    },
});
