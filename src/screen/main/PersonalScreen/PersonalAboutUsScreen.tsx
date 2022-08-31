import { StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Box, ScrollView, useTheme } from 'native-base';
import { HeaderBar, scale } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';

const content = `<p><strong><em>Xe máy điện EVGO công nghệ Đức chính thức có mặt tại Quảng Ninh, mang đến cho khách hàng nhiều hơn những sự lựa chọn. Không chỉ sở hữu một chiếc xe tốt, khách hàng còn được tặng ngay 2 triệu đồng và mũ bảo hiểm chính hãng trong tháng khai trương. </em></strong></p>
<p>Ngày 19/01/2022, Tập đoàn Sơn Hà tiếp tục ra mắt sản phẩm xe máy điện mới mang thương hiệu EVGO tại thị trường Quảng Ninh. Sự kiện đã được hãng tổ chức tại Đại lý ủy nhiệm của EVGO, 308 Vũ Văn Hiếu, phường Hà Tu, TP. Hạ Long, tỉnh Quảng Ninh.</p>
<p><img class="wp-image-14637 size-large aligncenter" src="https://www.sonha.com.vn/wp-content/uploads/2022/01/evgo1-1024x686.jpg" alt="" width="1024" height="686" /></p>
<p style="text-align: center;"><em>Ông Đinh Đức Tuấn – Phó Giám đốc Công ty SHE – đơn vị sản xuất xe máy điện EVGO của Tập đoàn Sơn Hà - phát biểu tại buổi lễ.</em></p>
<p>Phát biểu tại lễ ra mắt xe điện EVGO, <strong><em>ông Đinh Đức Tuấn – Phó Giám đốc Công ty CP Phát triển năng lượng Sơn Hà</em></strong><strong> <em>(SHE)</em> -</strong> nhấn mạnh: Các dòng xe máy điện EVGO của Sơn Hà đều sử dụng động cơ Bosch hàng đầu của Đức, loại động cơ In-Hub một chiều không chổi than để dẫn động trực tiếp vào bánh xe. Khác với xe động cơ đốt trong, phải thông qua động cơ, hộp số rồi mới chuyển động tới bánh, động cơ dẫn động trực tiếp của EVGO đơn giản và êm ái hơn rất nhiều. Việc dẫn động trực tiếp mang đến cho máy sự vận hành trơn tru, lấy được toàn bộ lực của động cơ và vì có cơ chế đơn giản, các chuyên gia đánh giá độ bền của động cơ này sẽ cao hơn. Cũng nhờ sử dụng động cơ Bosch mà EVGO cho khả năng vận hành mạnh mẽ trên mọi loại địa hình, đồng thời còn rất tiết kiệm năng lượng và thân thiện với môi trường.</p>
<p><img class="aligncenter wp-image-14644 size-large" src="https://www.sonha.com.vn/wp-content/uploads/2022/01/0-02-06-40de2f185f42a6629e2e5be669ff3d317cac669bc5477ce1e69140928153518b_28f2c72eb2e5f265-1024x576.jpg" alt="" width="1024" height="576" /></p>
<p style="text-align: center;"><em>Xe máy điện EVGO sử dụng động cơ Bosch một chiều không chổi than của Đức.</em></p>
<p>Cũng theo ông Đinh Đức Tuấn, trong năm 2021, Sơn Hà cũng tung ra thị trường hai dòng xe ở phân khúc cao cấp hơn, đó là Ecooter ET1 và EH1, đáp ứng nhu cầu và thị hiếu của khách hàng. Ecooter hiện đang là dòng xe rất được ưa chuộng tại các nước châu Âu.</p>
<p><img class="aligncenter wp-image-14642 size-large" src="https://www.sonha.com.vn/wp-content/uploads/2022/01/viber_image_2022-01-20_10-49-01-366-1024x724.jpg" alt="" width="1024" height="724" /></p>
<p style="text-align: center;"><em>Ecooter ET1 – dòng xe thuộc phân khúc cao cấp của Sơn Hà.</em></p>
<p>Với mục tiêu chiếm lĩnh thị trường phía Bắc, năm 2021, Tập đoàn Sơn Hà đã khai trương chuỗi showroom trưng bày sản phẩm và hệ thống đại lý ủy nhiệm xe máy điện EVGO tại một số tỉnh thành phố như Hà Nội, Vĩnh Phúc, Hải Dương, Hà Nam… Tại Quảng Ninh, sản phẩm xe máy điện EVGO của Sơn Hà cũng dành được sự đón nhận và đánh giá cao của hệ thống đại lý và khách hàng. Hãng này cho biết sẽ tiếp tục ra mắt sản phẩm mới và mở rộng hệ thống đại lý phân phối tại nhiều tỉnh, thành trong cả nước.</p>
<p><img class="wp-image-14639 size-large aligncenter" src="https://www.sonha.com.vn/wp-content/uploads/2022/01/evgo4-1024x684.jpg" alt="" width="1024" height="684" /></p>
<p style="text-align: center;"><em>Lễ ra mắt sản phẩm EVGO tại Quảng Ninh.</em></p>
<p>Covid 19, ô nhiễm môi trường, giá xăng ngàng càng tăng… khiến cho thị trường xe hai bánh giảm sút, nhưng lại là cơ hội để các dòng xe máy điện lên ngôi. Sau một thời gian trầm lắng do ảnh hưởng của dịch bệnh, hiện thị trường xe điện đã sôi động trở lại. Nhiều mẫu xe mới và chương trình ưu đãi cũng được tung ra để kích cầu tiêu dùng dịp cuối năm. Theo ghi nhận từ hệ thống đại lý xe máy điện trên địa bàn tỉnh Quảng Ninh, lượng khách tìm đến cửa hàng tăng lên đáng kể trong 2-3 tháng qua.</p>
<p>Anh Thành Trung, chủ đại lý ủy nhiệm xe điện EVGO tại Quảng Ninh cũng cho hay, đối tượng khách hàng quan tâm tìm mua xe máy điện nhiều nhất là phụ huynh mua cho con đi học, giáo viên, nhân viên văn phòng, người nội trợ. Hầu hết khách hàng lựa chọn các mẫu xe điện ở phân khúc giá tầm trung, thương hiệu được kiểm chứng và chế độ bảo hành dài hạn.</p>
<p><img class="aligncenter wp-image-14640 size-large" src="https://www.sonha.com.vn/wp-content/uploads/2022/01/evgo3-1024x609.jpg" alt="" width="1024" height="609" /></p>
<p><em>Đại lý ủy nhiệm xe máy điện EVGO tại Quảng Ninh kinh doanh tất cả các dòng xe máy điện mới nhất của Sơn Hà.</em></p>
<p>Theo đánh giá của chủ doanh nghiệp này, xe máy điện EVGO của Sơn Hà, từ kiểu dáng, chất lượng, chính sách bảo hành hay giá cả đều đang có nhiều lợi thế cạnh tranh trên thị trường. Giá dao động từ 20,9 triệu đồng đến 25,9 triệu đồng cho mỗi chiếc xe EVGO. Với dải giá và mẫu mã xe đa dạng, khách hàng có thể dễ dàng lựa chọn sản phẩm phù hợp với nhu cầu và mục đích khác nhau.</p>
// eslint-disable-next-line no-irregular-whitespace, no-irregular-whitespace
<p>Chẳng hạn, người lớn đi làm, đi chợ có thể chọn xe EVGO A với kiểu dáng tinh tế, năng động và sành điệu. Còn học sinh cấp 2, cấp 3 đi học thường chọn xe EVGO C và EVGO D với kiểu dáng nhỏ gọn, nhẹ nhàng, thanh lịch. Công suất cực đại của động cơ <strong>xe EVGO</strong> đạt 1.500W. Tốc độ xe tối đa 50km/h và có thể di chuyển quãng đường từ 60 đến 75km chỉ với một lần sạc, tùy dòng xe.</p>
<p><img class="aligncenter wp-image-14643 size-large" src="https://www.sonha.com.vn/wp-content/uploads/2022/01/viber_image_2022-01-20_10-49-00-376-1024x724.jpg" alt="" width="1024" height="724" /></p>
<p style="text-align: center;"><em>Ecooter EH1 – dòng xe thuộc phân khúc cao cấp của Sơn Hà.</em></p>
<p>Ngoài ra, nhiều tính năng công nghệ hiện đại cũng được nhà sản xuất tích hợp trong mỗi chiếc xe EVGO như: chống trộm bằng cảm biến, cảnh báo khi xe di chuyển và khóa xe từ xa, cổng sạc USB tiện lợi... Thời gian bảo hành từ hãng lên tới 24 tháng.</p>
<p>Truy cập website <a href="https://evgo.vn/">https://evgo.vn/</a> hoặc gọi tới hotline 1800 6566 để biết thêm thông tin chi tiết về sản phẩm xe máy điện Sơn Hà.</p>
<p style="text-align: left;"><a href="https://evgo.vn/pages/he-thong-cua-hang"><strong>HỆ THỐNG ĐẠI LÝ</strong></a><strong> XE ĐIỆN EVGO TẠI QUẢNG NINH</strong></p>
<table style="width: 64.708%; height: 526px;" width="605">
<tbody>
<tr style="height: 55px;">
<td style="width: 15.2824%; height: 55px;" width="50">
<p><strong>STT</strong></p>
</td>
<td style="width: 49.8139%; height: 55px;" width="285">
<p><strong>ĐẠI LÝ</strong></p>
</td>
<td style="width: 47.2883%; height: 55px;" width="270">
<p><strong>ĐỊA CHỈ</strong></p>
</td>
</tr>
<tr style="height: 55px;">
<td style="width: 15.2824%; height: 55px;" width="50">
<p>1</p>
</td>
<td style="width: 49.8139%; height: 55px;" width="285">
<p>Hệ thống Xe điện Thành Đạt (2 cơ sở)</p>
</td>
<td style="width: 47.2883%; height: 55px;" width="270">
<p>TP. Uông Bí</p>
</td>
</tr>
<tr style="height: 79px;">
<td style="width: 15.2824%; height: 79px;" width="50">
<p>2</p>
</td>
<td style="width: 49.8139%; height: 79px;" width="285">
<p>Hệ thống Xe điện Đông Lý (3 cơ sở)</p>
</td>
<td style="width: 47.2883%; height: 79px;" width="270">
<p>Huyện Hải Hà, huyện Đầm Hà và TP. Móng Cái</p>
</td>
</tr>
<tr style="height: 38px;">
<td style="width: 15.2824%; height: 38px;" width="50">
<p>3</p>
</td>
<td style="width: 49.8139%; height: 38px;" width="285">
<p>Xe điện Minh Quyết</p>
</td>
<td style="width: 47.2883%; height: 38px;" width="270">
<p>Huyện Tiên Yên</p>
</td>
</tr>
<tr style="height: 55px;">
<td style="width: 15.2824%; height: 55px;" width="50">
<p>4</p>
</td>
<td style="width: 49.8139%; height: 55px;" width="285">
<p>Xe điện Thành Hưng</p>
</td>
<td style="width: 47.2883%; height: 55px;" width="270">
<p>TP. Cẩm Phả</p>
</td>
</tr>
<tr style="height: 55px;">
<td style="width: 15.2824%; height: 55px;" width="50">
<p>5</p>
</td>
<td style="width: 49.8139%; height: 55px;" width="285">
<p>Xe điện Thái Bảo</p>
</td>
<td style="width: 47.2883%; height: 55px;" width="270">
<p>TP. Móng Cái</p>
</td>
</tr>
<tr style="height: 79px;">
<td style="width: 15.2824%; height: 79px;" width="50">
<p>6</p>
</td>
<td style="width: 49.8139%; height: 79px;" width="285">
<p>Công ty TNHH Xuất nhập khẩu thương mại Toàn Việt (Xe điện Trường Tồn)</p>
</td>
<td style="width: 47.2883%; height: 79px;" width="270">
<p>Huyện Bình Liêu</p>
</td>
</tr>
<tr style="height: 55px;">
<td style="width: 15.2824%; height: 55px;" width="50">
<p>7</p>
</td>
<td style="width: 49.8139%; height: 55px;" width="285">
<p>Hệ thống Xe điện Đức Anh (6 cơ sở)</p>
</td>
<td style="width: 47.2883%; height: 55px;" width="270">
<p>TP. Hạ Long</p>
</td>
</tr>
<tr style="height: 55px;">
<td style="width: 15.2824%; height: 55px;" width="50">
<p>8</p>
</td>
<td style="width: 49.8139%; height: 55px;" width="285">
<p>Xe điện Hưng Hằng</p>
</td>
<td style="width: 47.2883%; height: 55px;" width="270">
<p>Thị xã Quảng Yên</p>
</td>
</tr>
</tbody>
</table>`;

const PersonalAboutUsComponent = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    return (
        <Box safeArea bg={colors.white}>
            <HeaderBar navigation={navigation} onPressLeft={() => navigation.goBack()} title='Về Poshaco' />
            <Box px={`${scale(16)}px`} mb='48px'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RenderHTML contentWidth={width} source={{ html: content }} />
                </ScrollView>
            </Box>
        </Box>
    );
};

export const PersonalAboutUsScreen = React.memo(PersonalAboutUsComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);
