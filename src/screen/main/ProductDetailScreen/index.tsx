import { StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import isEqual from 'react-fast-compare';
import { Button as BtnRB, Box, ScrollView, StatusBar, useTheme, Text, HStack, VStack } from 'native-base';
import { HeaderBar, Image, scale, vScale, Button } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import logger from '@src/utils/common/logger';
import RenderHTML from 'react-native-render-html';
import Collapsible from 'react-native-collapsible';
import { themes } from '@src/utils';
import { SCREENS } from '@src/navigation';

const data = {
    content:
        '<p><strong>Những khoản đầu tư v&agrave;o si&ecirc;u tổ hợp nghỉ dưỡng &ndash; giải tr&iacute; &ndash; mua sắm Grand World Ph&uacute; Quốc đ&atilde; c&oacute; thể bắt đầu sinh lời cho chủ đầu tư sau khi c&aacute;c căn shop thương mại Vincom đầu ti&ecirc;n được b&agrave;n giao.</strong></p>\n<p>Thời gian thi c&ocirc;ng thần tốc c&ugrave;ng việc b&agrave;n giao đ&uacute;ng thời hạn cam kết của dự &aacute;n khiến nh&agrave; đầu tư kỳ vọng sẽ c&oacute; lợi nhuận sớm.</p>\n<p><strong>Trao tay những ch&igrave;a kh&oacute;a đầu ti&ecirc;n</strong></p>\n<p>Giữ đ&uacute;ng cam kết với kh&aacute;ch h&agrave;ng, ng&agrave;y 9/3/2020 vừa qua, chủ đầu tư NewVision đ&atilde; ch&iacute;nh thức b&agrave;n giao c&aacute;c căn shop thương mại Vincom đầu ti&ecirc;n cho nh&agrave; đầu tư tại ph&acirc;n khu Mallorca của si&ecirc;u tổ hợp nghỉ dưỡng &ndash; giải tr&iacute; &ndash; mua sắm Grand World Ph&uacute; Quốc. Nhận ch&igrave;a kh&oacute;a trao tay, chủ nh&acirc;n của c&aacute;c căn shop thương mại ai ai cũng phấn khởi v&igrave; c&oacute; th&ecirc;m thời gian chăm ch&uacute;t, bố tr&iacute; nội thất theo gu ri&ecirc;ng để sẵn s&agrave;ng kinh doanh hoặc cho thu&ecirc;.</p>\n<p>&ldquo;<em>Ph&uacute; Quốc lu&ocirc;n l&agrave; điểm đến du lịch h&agrave;ng đầu của cả nước, nay c&oacute; th&ecirc;m Grand World với m&ocirc; h&igrave;nh th&agrave;nh phố kh&ocirc;ng ngủ sở hữu hệ sinh th&aacute;i l&yacute; tưởng, chắc chắn sẽ thu h&uacute;t một lượng kh&aacute;ch khổng lồ về đ&acirc;y nghỉ dưỡng, giải tr&iacute;. T&ocirc;i ho&agrave;n to&agrave;n tự tin về khả năng sinh lời hiệu quả từ việc khai th&aacute;c shop thương mại Vincom tại đ&acirc;y</em>&rdquo;, anh L.V.C, nh&agrave; đầu tư đến từ TP HCM h&agrave;o hứng chia sẻ.</p>\n<div class="wp-block-image">\n<figure class="aligncenter"><img src="http://image.congan.com.vn/thumbnail/CATP-480-2020-3-12/a1.jpg" alt="Với tiến độ thi c&ocirc;ng thần tốc, kh&ocirc;ng chỉ shop thương mại Vincom m&agrave; nhiều hạng mục kh&aacute;c của Grand World Ph&uacute; Quốc cũng sẽ &ldquo;về đ&iacute;ch sớm&rdquo; để b&agrave;n giao cho nh&agrave; đầu tư" />\n<figcaption><em>Với tiến độ thi c&ocirc;ng thần tốc, kh&ocirc;ng chỉ shop thương mại Vincom m&agrave; nhiều hạng mục kh&aacute;c của Grand World Ph&uacute; Quốc cũng sẽ &ldquo;về đ&iacute;ch sớm&rdquo; để b&agrave;n giao cho nh&agrave; đầu tư.</em></figcaption>\n</figure>\n</div>\n<p>Hiện c&aacute;c khu shop thương mại Vincom kh&aacute;c gồm Indochine, Shanghai v&agrave; shop quảng trường cũng đ&atilde; ho&agrave;n thiện x&acirc;y dựng th&ocirc; v&agrave; mặt ngo&agrave;i, chuẩn bị sẵn s&agrave;ng b&agrave;n giao. Kh&ocirc;ng bao l&acirc;u nữa, c&aacute;c con phố thương mại sầm uất, đa sắc m&agrave;u văn h&oacute;a, mở cửa 24/7 sẽ trở th&agrave;nh những &ldquo;cỗ m&aacute;y sinh lời kh&ocirc;ng nghỉ ph&eacute;p&rdquo; nơi đảo Ngọc.</p>\n<div class="wp-block-image">\n<figure class="aligncenter"><img src="http://image.congan.com.vn/thumbnail/CATP-480-2020-3-12/a2.jpg" alt="C&aacute;c nh&agrave; đầu tư chuy&ecirc;n nghiệp ho&agrave;n to&agrave;n tin tưởng v&agrave;o khả năng sinh lời vượt trội của khu shop thương mại Vincom" />\n<figcaption><em>C&aacute;c nh&agrave; đầu tư chuy&ecirc;n nghiệp ho&agrave;n to&agrave;n tin tưởng v&agrave;o khả năng sinh lời vượt trội của khu shop thương mại Vincom.</em></figcaption>\n</figure>\n</div>\n<p>Khu shop thương mại Vincom tọa lạc ở vị tr&iacute; đắc địa của tổ hợp đẳng cấp quốc tế Grand World, kh&ocirc;ng chỉ thụ hưởng nguồn kh&aacute;ch lớn lưu tr&uacute; ngay tại hệ thống condotel trong nội khu m&agrave; c&ograve;n thu h&uacute;t lượng kh&aacute;ch dồi d&agrave;o từ hệ sinh th&aacute;i vui chơi giải tr&iacute; cao cấp ngay b&ecirc;n cạnh, gồm Corona Resort &amp; Casino Ph&uacute; Quốc &ndash; casino đầu ti&ecirc;n cho ph&eacute;p người Việt v&agrave;o chơi, s&acirc;n golf 18 hố, thi&ecirc;n đường giải tr&iacute; VinWonders, vườn th&uacute; mở b&aacute;n hoang d&atilde; Vinpearl Safari&hellip;</p>\n<div class="wp-block-image">\n<figure class="aligncenter"><img src="http://image.congan.com.vn/thumbnail/CATP-480-2020-3-12/a3.jpg" alt="Kh&ocirc;ng bao l&acirc;u nữa, c&aacute;c khu phố thương mại sẽ ho&agrave;n tất v&agrave; đi v&agrave;o vận h&agrave;nh đồng bộ c&ugrave;ng với si&ecirc;u tổ hợp Grand World" />\n<figcaption><em>Kh&ocirc;ng bao l&acirc;u nữa, c&aacute;c khu phố thương mại sẽ ho&agrave;n tất v&agrave; đi v&agrave;o vận h&agrave;nh đồng bộ c&ugrave;ng với si&ecirc;u tổ hợp Grand World.</em></figcaption>\n</figure>\n</div>\n<p><strong>Si&ecirc;u tổ hợp nghỉ dưỡng, giải tr&iacute;, mua sắm dần th&agrave;nh h&igrave;nh</strong></p>\n<p>Những ng&agrave;y đầu th&aacute;ng 3/2020, chủ đầu tư NewVision v&agrave; cổ đ&ocirc;ng chiến lược Vinpearl cho biết tất cả c&aacute;c hạng mục đều đang trong giai đoạn thi c&ocirc;ng nước r&uacute;t để ho&agrave;n thiện đồng bộ dự &aacute;n, đưa v&agrave;o vận h&agrave;nh từ qu&yacute; IV/2020, đ&uacute;ng như cam kết với c&aacute;c nh&agrave; đầu tư. D&ograve;ng &ldquo;k&ecirc;nh đ&agrave;o Venice&rdquo; thơ mộng &ndash; điểm nhấn của dự &aacute;n cũng sắp ho&agrave;n th&agrave;nh. 3 c&acirc;y cầu bắc qua k&ecirc;nh hiện đ&atilde; ho&agrave;n tất phần b&ecirc; t&ocirc;ng cốt th&eacute;p.</p>\n<div class="wp-block-image">\n<figure class="aligncenter"><img src="http://image.congan.com.vn/thumbnail/CATP-480-2020-3-12/a4.jpg" alt="H&igrave;nh ảnh thực tế tại dự &aacute;n cho thấy k&ecirc;nh đ&agrave;o Venice đang ở trong những c&ocirc;ng đoạn ho&agrave;n thiện cuối c&ugrave;ng" />\n<figcaption><em>H&igrave;nh ảnh thực tế tại dự &aacute;n cho thấy k&ecirc;nh đ&agrave;o Venice đang ở trong những c&ocirc;ng đoạn ho&agrave;n thiện cuối c&ugrave;ng.</em></figcaption>\n</figure>\n</div>\n<div class="wp-block-image">\n<figure class="aligncenter"><img src="http://image.congan.com.vn/thumbnail/CATP-480-2020-3-12/a5.jpg" alt="Hồ trung t&acirc;m - nơi diễn ra c&aacute;c show diễn với c&ocirc;ng nghệ &acirc;m thanh, &aacute;nh s&aacute;ng đỉnh cao đ&atilde; ho&agrave;n thiện phần đ&aacute;y, sơn tạo m&agrave;u v&agrave; đang được bơm nước thử tải" />\n<figcaption><em>Hồ trung t&acirc;m &ndash; nơi diễn ra c&aacute;c show diễn với c&ocirc;ng nghệ &acirc;m thanh, &aacute;nh s&aacute;ng đỉnh cao đ&atilde; ho&agrave;n thiện phần đ&aacute;y, sơn tạo m&agrave;u v&agrave; đang được bơm nước thử tải.</em></figcaption>\n</figure>\n</div>\n<p>Hệ thống c&aacute;c trục đường ch&iacute;nh của tổ hợp cũng sắp ho&agrave;n th&agrave;nh. Ri&ecirc;ng Vinpearl Grand World Condotel c&oacute; 8 tầng th&igrave; đến hết th&aacute;ng 2/2020 đ&atilde; x&acirc;y dựng đến tầng 7, tức chỉ c&ograve;n 1 tầng nữa l&agrave; ho&agrave;n th&agrave;nh phần th&ocirc;. Như vậy, chỉ trong 13 th&aacute;ng sau ng&agrave;y khởi c&ocirc;ng, Grand World &ndash; si&ecirc;u dự &aacute;n nghỉ dưỡng, giải tr&iacute;, mua sắm quy m&ocirc; lớn nhất Ph&uacute; Quốc &ndash; đ&atilde; dần th&agrave;nh h&igrave;nh.</p>\n<div class="wp-block-image">\n<figure class="aligncenter"><img src="http://image.congan.com.vn/thumbnail/CATP-480-2020-3-12/a6.jpg" alt="Si&ecirc;u tổ hợp 85ha Grand World Ph&uacute; Quốc đang ho&agrave;n thiện từng ng&agrave;y, trở th&agrave;nh c&uacute; h&iacute;ch mạnh mẽ cho du lịch đảo Ngọc vươn xa, trở th&agrave;nh điểm đến đẳng cấp quốc tế trong tương lai gần" />\n<figcaption><em>Si&ecirc;u tổ hợp 85ha Grand World Ph&uacute; Quốc đang ho&agrave;n thiện từng ng&agrave;y, trở th&agrave;nh c&uacute; h&iacute;ch mạnh mẽ cho du lịch đảo Ngọc vươn xa, trở th&agrave;nh điểm đến đẳng cấp quốc tế trong tương lai gần.</em></figcaption>\n</figure>\n</div>\n<p>Nhiều nh&agrave; đầu tư kỳ vọng, Grand World Ph&uacute; Quốc sẽ l&agrave; dự &aacute;n ti&ecirc;n phong thắp s&aacute;ng nền kinh tế đ&ecirc;m chuy&ecirc;n nghiệp đầu ti&ecirc;n của du lịch Việt Nam, hứa hẹn mang lại nguồn thu v&agrave; lượng việc l&agrave;m khổng lồ cho ng&agrave;nh du lịch. Dự &aacute;n cũng sẽ g&oacute;p phần gi&uacute;p Ph&uacute; Quốc n&oacute;i ri&ecirc;ng v&agrave; Việt Nam n&oacute;i chung c&oacute; vị tr&iacute; xứng tầm tr&ecirc;n bản đồ kinh tế đ&ecirc;m của thế giới v&agrave; vươn m&igrave;nh trở th&agrave;nh thủ phủ du lịch h&agrave;ng đầu Đ&ocirc;ng Nam &Aacute;.&nbsp;</p>\n<p><em>&ldquo;Hiện tại, chủ đầu tư đang triển khai ch&iacute;nh s&aacute;ch b&aacute;n h&agrave;ng hấp dẫn &aacute;p dụng cho c&aacute;c căn shop thương mại Grand World: Cam kết tiền thu&ecirc; 5% mỗi năm cho nh&agrave; đầu tư trong 2 năm đầu ti&ecirc;n kể từ ng&agrave;y nhận b&agrave;n giao shop. Ch&iacute;nh s&aacute;ch hỗ trợ kh&aacute;ch thu&ecirc; ưu việt &ndash; miễn tiền thu&ecirc; đến 2 năm, hỗ trợ g&oacute;i nội thất tương đương 6% gi&aacute; b&aacute;n. Cơ hội đầu tư trong tầm tay với cam kết hỗ trợ t&agrave;i ch&iacute;nh trong 3 năm: hỗ trợ l&atilde;i suất v&agrave; &acirc;n hạn nợ gốc 9 th&aacute;ng đầu ti&ecirc;n, &acirc;n hạn nợ gốc th&ecirc;m 24 th&aacute;ng sau thời gian hỗ trợ l&atilde;i suất của ng&acirc;n h&agrave;ng uy t&iacute;n. &ldquo;</em></p>',
    listSource: [
        'https://picsum.photos/230',
        'https://picsum.photos/231',
        'https://picsum.photos/232',
        'https://picsum.photos/233',
        'https://picsum.photos/234',
    ],
};

const dataTable = [
    {
        field: 'Số sóng',
        value: '13 sóng laphong, 5 sóng vuông, 9 sóng vuông, Tấm phẳng',
    },
    {
        field: 'Màu',
        value: 'Antifinger Blue, Antifinger Green, Antifinger Green, Antifinger Lạnh, Antifinger Lạnh, Antifinger Yellow, Antifinger Yellow',
    },
    {
        field: 'Dày',
        value: '0.18mm, 0.20mm, 0.22mm, 0.25mm, 0.30mm, 0.35mm, 0.37mm, 0.40mm',
    },
    {
        field: 'Số lớp',
        value: '2 lớp, 3 lớp, 5 lớp',
    },
];

type PropsInfoProduct = {
    name: string;
    content: string;
    colors: any;
    fonts: any;
    index: number;
};

const InfoProduct = ({ name, content, colors, fonts, index }: PropsInfoProduct) => (
    <HStack
        flex={1}
        alignItems='flex-start'
        borderWidth={1}
        borderColor={colors?.borderTable}
        borderTopWidth={index === 0 ? 1 : 0}
    >
        <Box pt={`${vScale(7)}`} pb={`${vScale(7)}px`} pl={`${vScale(10)}px`} pr={`${scale(10)}px`} w='96px'>
            <Text fontSize='16px' fontFamily={fonts?.hMedium} color={colors?.dark}>
                {name}
            </Text>
        </Box>
        <Box
            flex={1}
            pt={`${vScale(8)}px`}
            pb={`${vScale(8)}px`}
            pl={`${vScale(8)}px`}
            pr={`${scale(13)}px`}
            borderLeftColor={colors?.borderTable}
            borderLeftWidth={1}
        >
            <Text fontSize='16px' color={colors?.darkNeu}>
                {content}
            </Text>
        </Box>
    </HStack>
);

const ProductDetailComponent = () => {
    const { colors, fonts } = useTheme();
    const navigation = useNavigation();

    const [isCollapsed, setIsCollapsed] = useState(true);

    const { width } = useWindowDimensions();
    return (
        <Box safeArea flex={1} bg={colors.white} pb={`${vScale(120)}`}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <Box px='16px' pb={2}>
                <HeaderBar nameIconRight='support' navigation={navigation} />
            </Box>
            <ScrollView showsVerticalScrollIndicator={false} mb={`${vScale(60)}`} px='16px'>
                <Box>
                    <Swiper
                        autoplay
                        scrollEnabled
                        autoplayTimeout={5}
                        showsButtons={false}
                        style={styles.swiper}
                        dotColor={colors.white}
                        activeDotColor={colors.blue}
                        paginationStyle={styles.paginationStyle}
                    >
                        {data?.listSource?.map((thumb, index) => (
                            <Image
                                key={index}
                                source={{ uri: thumb }}
                                // resizeMode='cover'
                                style={styles.flex}
                                placeholder
                            />
                        ))}
                    </Swiper>
                </Box>
                <Box>
                    <Box py='16px' mb='16px'>
                        <Text
                            fontSize='14px'
                            fontFamily={fonts.hMedium}
                            color={colors.darkNeu}
                            mb={`${vScale(4)}px`}
                            textTransform='uppercase'
                        >
                            Poshaco
                        </Text>
                        <Text
                            fontSize='20px'
                            fontWeight='bold'
                            color={colors.dark}
                            mb={`${vScale(8)}px`}
                            textTransform='uppercase'
                        >
                            Tôn Việt Hàn Poshaco az100
                        </Text>
                        <HStack>
                            <Text color={colors.darkNeu} fontSize='16px'>
                                Chỉ từ:{' '}
                            </Text>
                            <Text color={colors.red} fontWeight='bold' fontSize='16px' fontFamily={fonts.hBold}>
                                17.500₫
                            </Text>
                            <Text color={colors.darkNeu} fontSize='16px'>
                                {' '}
                                /1 tấm
                            </Text>
                        </HStack>
                        <Box mt='16px'>
                            <Button
                                title='Tính thử chi phí'
                                isOutline
                                h='48px'
                                _text={{ fontSize: '16px', color: colors.blue }}
                                onPress={() => navigation.navigate(SCREENS.PRODUCT_CALCULATE_SCREEN)}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Text fontSize='16px' fontWeight='bold' fontFamily={fonts.hBold}>
                        Giới thiệu
                    </Text>
                    <Collapsible collapsed={isCollapsed} collapsedHeight={210}>
                        <RenderHTML contentWidth={width} source={{ html: data.content }} />
                    </Collapsible>
                    <BtnRB
                        onPress={() => setIsCollapsed(!isCollapsed)}
                        variant='Unstyled'
                        mt='16px'
                        _text={{ color: colors.blue, fontSize: '14px' }}
                    >
                        <Text color={colors.blue} fontSize='14px' fontFamily={fonts.hBold} fontWeight='bold'>
                            {`${isCollapsed ? 'Mở rộng' : 'Thu gọn'}`}
                        </Text>
                    </BtnRB>
                </Box>
                <Box mt='24px' mb='32px'>
                    <Text fontSize='16px' fontWeight='bold' fontFamily={fonts.hBold} mb='16px'>
                        Thông tin sản phẩm
                    </Text>
                    {dataTable &&
                        Array.isArray(dataTable) &&
                        dataTable.length > 0 &&
                        dataTable.map(({ field, value }, index) => (
                            <InfoProduct name={field} content={value} colors={colors} fonts={fonts} index={index} />
                        ))}
                </Box>
            </ScrollView>
            <Box style={styles.orderButton} px='16px' py='16px' w='full' bg={colors.white}>
                <Button title='Đặt mua' h='48px' />
            </Box>
        </Box>
    );
};

export const ProductDetailScreen = React.memo(ProductDetailComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    swiper: {
        height: vScale(180),
    },
    paginationStyle: {
        right: scale(16),
        left: 'auto',
        bottom: vScale(12),
    },
    orderButton: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: vScale(26),
        // backgroundColor: 'red',
        shadowColor: themes.colors.darkNeu,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: vScale(8),
        },
    },
});
