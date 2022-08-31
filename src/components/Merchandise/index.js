/* eslint-disable prettier/prettier */
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { View, Text, Col, Grid } from 'native-base';
import { StyleSheet, FlatList } from 'react-native';
import React, { useRef } from 'react';
import numeral from 'numeral';
import { Touchable, scale, vScale, Button } from 'components';
import { Colors, FontSize, Fonts } from 'themes';
import Icon from 'IconCustom';

import ListItem from '../ListItem';

function MerchandiseValue({
  type,
  dimension,
  editable,
  onDeleteDimension,
  showEditDimension,
  showTotal,
}) {
  const rowRef = useRef(null);

  const deleteDimension = () => {
    rowRef.current.close();
    onDeleteDimension(dimension);
  };

  const editDimension = () => {
    rowRef.current.close();
    showEditDimension(dimension);
  };

  const renderRight = () => {
    if (!editable) {
      return null;
    }

    return (
      <View row>
        <Touchable
          style={[styles.rightAction, { marginLeft: scale(20) }]}
          onPress={deleteDimension}
        >
          <Icon name="trash" size={25} color={Colors.white} />
        </Touchable>
        <Touchable
          style={[styles.rightAction, { backgroundColor: Colors.orange }]}
          onPress={editDimension}
        >
          <Icon name="pencil" size={25} color={Colors.white} />
        </Touchable>
      </View>
    );
  };

  return (
    <View style={styles.contentItem}>
      <Swipeable
        ref={rowRef}
        renderRightActions={renderRight}
        childrenContainerStyle={styles.childSwiper}
      >
        <Grid style={styles.grid}>
          {/* Cột - Loại - Bớt Pu */}
          {type && (
            <Col size={1}>
              <Text>{type}</Text>
            </Col>
          )}

          {/* Cột - KÍCH THƯỚC */}
          <Col size={1}>
            <Text>{dimension.size}</Text>
          </Col>

          {/* Cột - Số Tấm */}
          <Col size={0.7}>
            <View row space>
              <Text size14 darkNeu hBold>
                x
              </Text>
              <Text>{dimension.sheet}</Text>
            </View>
          </Col>

          {/* Cột - Số lượng */}
          <Col size={1.3}>
            <View row space>
              <Text size14 darkNeu hBold style={!type && styles.marginEqual}>
                {'    ='}
              </Text>
              <Text>
                {dimension?.amount % 1 !== 0
                  ? dimension.amount?.toFixed(2)
                  : dimension.amount}
              </Text>
            </View>
          </Col>
        </Grid>
      </Swipeable>

      {showTotal && (
        <View width alignEnd style={{ paddingVertical: vScale(8) }}>
          <Text red size15 hBold>
            {numeral(dimension.size * dimension.sheet).format()}₫
          </Text>
        </View>
      )}
    </View>
  );
}

class Merchandise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = ({ item, index }) => {
    const { onDeleteDimension, showEditDimension, editable } = this.props;
    return (
      <MerchandiseValue
        key={index}
        index={index}
        dimension={item}
        editable={editable}
        onDeleteDimension={onDeleteDimension}
        showEditDimension={showEditDimension}
      />
    );
  };

  keyExtractor = (item, index) => `${index  }`;

  onPressEdit = () => {
    const { showEditProduct } = this.props;
    showEditProduct && showEditProduct();
  };

  render() {
    const { editable, merchandise, onInsertData } = this.props;
    return (
      <View white hidden style={styles.content}>
        <View row space flex>
          <Text hBold size16 numberOfLines={2} wrap>
            {merchandise.name}
          </Text>
          {editable && (
            <Touchable onPress={this.onPressEdit}>
              <Text hBold blueMalibu>
                Chỉnh sửa
              </Text>
            </Touchable>
          )}
        </View>
        <ListItem
          bold
          space
          label="KHỔ"
          style={styles.unitPrice}
          styleLabel={styles.label}
          value={`${merchandise.sizeWood} cm`}
        />
        <ListItem
          bold
          space
          boldLeft
          label="ĐƠN GIÁ"
          value={`${numeral(merchandise.unitPrice).format()}đ`}
          styleLabel={[styles.label, { marginBottom: vScale(10) }]}
        />
        <FlatList
          data={merchandise.dimensions}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={merchandise.dimensions}
          ListHeaderComponent={
            <MerchandiseHeader
              size="KÍCH THƯỚC"
              sheet="TẤM"
              amount="SỐ LƯỢNG"
            />
          }
          ListEmptyComponent={
            <MerchandiseHeader
              onPress={onInsertData}
              empty
              size="Null"
              sheet="Null"
              amount="0"
            />
          }
          ListFooterComponent={
            merchandise.dimensions.length &&
            editable && (
              <Button
                dash
                title="Thêm kích thước sản phẩm"
                style={styles.btnAddProduct}
                onPress={onInsertData}
              />
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: scale(8),
    padding: scale(12),
    paddingBottom: 0,
    flex: 1,
  },
  label: {
    fontSize: FontSize.size12,
    fontFamily: Fonts.hBold,
  },
  unitPrice: {
    marginTop: vScale(12),
  },
  textHeader: {
    color: Colors.darkNeu,
    fontFamily: Fonts.hBold,
    fontSize: FontSize.size12,
  },
  textValue: {
    color: Colors.black,
    fontSize: FontSize.size16,
  },
  contentItem: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.white1,
  },
  marginEqual: {
    marginLeft: scale(20),
  },
  textEmpty: {
    marginLeft: scale(10),
  },
  btnAddProduct: {
    marginTop: vScale(10),
    marginLeft: scale(-12),
    backgroundColor: Colors.light,
  },
  rightAction: {
    width: scale(82),
    height: '100%',
    backgroundColor: Colors.red61,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    alignItems: 'center',
  },
  childSwiper: {
    backgroundColor: Colors.white,
    height: vScale(40),
  },
});

function MerchandiseHeader({ type, size, sheet, amount, onPress, empty }) {
  const textStyle = !empty ? styles.textHeader : styles.textValue;
  return (
    <View mgB10>
      <Grid>
        {/* Cột - Loại - Bớt Pu */}
        {type && (
          <Col size={1}>
            <Text size16 style={textStyle}>
              {type}
            </Text>
          </Col>
        )}

        {/* Cột - KÍCH THƯỚC */}
        <Col size={1}>
          <Text size16 style={textStyle}>
            {size}
          </Text>
        </Col>

        {/* Cột - Số Tấm */}
        <Col size={0.7}>
          <Text right size16 style={textStyle}>
            {sheet}
          </Text>
        </Col>

        {/* Cột - Số lượng */}
        <Col size={1.3}>
          <Text right size16 style={textStyle}>
            {amount}
          </Text>
        </Col>
      </Grid>

      {empty && (
        <View width row space mgT16>
          <View row>
            <Icon name="info-circle" size={30} color={Colors.darkNeu} />
            <Text darkNeu style={styles.textEmpty}>
              Điền số tấm & kích thước{'\n'}
              để hoàn tất đơn hàng
            </Text>
          </View>
          <Touchable onPress={onPress}>
            <Text size16 blueMalibu hMedium>
              Nhập dữ liệu
            </Text>
          </Touchable>
        </View>
      )}
    </View>
  );
}

export default Merchandise;
