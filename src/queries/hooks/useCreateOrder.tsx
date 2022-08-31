import logger from '@src/utils/common/logger';
import _ from 'lodash';
import { useToast } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { queryClient } from '../config';
import { PRODUCT_ORDER } from '../keys/product';

import { useGlobalState } from './useGlobalSate';

export interface ProductOrder {
    id: string;
    title: string;
    dimension: string;
    price: number;
    dataInfo: ProductInformation[];
    totalMeterial: number;
    totalPrice: number;
    species: string | null;
    brand: string | null;
    selected?: any;
}

export interface Order {
    id: string;
    price: number;
    products: ProductOrder[];
}

export interface ProductInformation {
    size: string;
    amountSheet: number | string;
}

export const useCreateOrder = () => {
    const [productOrder, setProductOrder] = useGlobalState<Order>(PRODUCT_ORDER, {
        id: uuidv4(),
        price: 0,
        products: [],
    });

    const toast = useToast();

    const price = useMemo(
        () => productOrder.products.reduce((prev, cur) => prev + Number(cur.totalPrice), 0),
        [productOrder]
    );

    // Product
    const addProductToOrder = (data: ProductOrder | null) => {
        if (!data) {
            return toast.show({ title: 'Thêm dữ liệu lỗi', placement: 'bottom' });
        }
        const newDataProduct = productOrder?.products?.length > 0 ? [...productOrder.products] : [];
        const dataProductDetail = {
            ...data,
            totalMeterial: 0,
            totalPrice: 0,
        };
        newDataProduct.push(dataProductDetail);
        return setProductOrder({ ...productOrder, products: newDataProduct, price });
    };

    const removeProduct = (idProduct: string | unknown) => {
        try {
            if (!idProduct) {
                return toast.show({ title: 'Xoá sản phẩm lỗi', placement: 'bottom' });
            }
            const productIndex = productOrder.products.findIndex(({ id }) => id === idProduct);
            const newProducts = [...productOrder.products];
            newProducts.splice(productIndex, 1);
            const newData = { ...productOrder, products: newProducts };
            setProductOrder({ ...newData, price });
            return toast.show({ title: 'Xoá sản phẩm thành công', placement: 'bottom' });
        } catch (error) {
            return toast.show({ title: 'Xoá sản phẩm lỗi', placement: 'bottom' });
        }
    };

    const updateProduct = (idProduct: string | unknown, data: ProductOrder) => {
        try {
            if (!idProduct) {
                return toast.show({ title: 'Sửa sản phẩm lỗi', placement: 'bottom' });
            }
            const productIndex = productOrder.products.findIndex(({ id }) => id === idProduct);
            const newDataProduct = [...productOrder.products];
            newDataProduct[productIndex] = data;
            setProductOrder({ ...productOrder, products: newDataProduct, price });
            return toast.show({ title: 'Sửa phẩm thành công', placement: 'bottom' });
        } catch (error) {
            return toast.show({ title: 'Sửa sản phẩm lỗi', placement: 'bottom' });
        }
    };
    // DataProduct
    const addDataToProduct = (data: ProductInformation, currentId: string | null) => {
        if (!currentId) {
            return toast.show({ title: 'Thêm dữ liệu lỗi', placement: 'bottom' });
        }
        logger.debug('addDataToProduct', data);
        const currentProduct = productOrder.products.find(({ id }) => id === currentId);

        const newInformation = {
            size: data.size,
            amountSheet: Number(data.amountSheet),
            dimension: currentProduct?.dimension ?? 1,
            total(this) {
                // eslint-disable-next-line no-unused-expressions
                return Number(this.size) * Number(this.amountSheet) * Number(this.dimension);
            },
        };

        if (currentProduct && !_.isEmpty(currentProduct)) {
            const currentDataInfo = currentProduct?.dataInfo?.length > 0 ? [...currentProduct.dataInfo] : [];
            currentDataInfo.push(newInformation);
            currentProduct.dataInfo = currentDataInfo;
            currentProduct.totalMeterial = currentDataInfo.reduce((prev: number, cur: any) => {
                const total = cur?.total();
                return prev + Number(total ?? 0);
            }, 0);
            currentProduct.totalPrice = currentProduct.totalMeterial * currentProduct.price;

            const newPrice = productOrder.products.reduce((prev, cur) => prev + Number(cur?.totalPrice), 0);
            return setProductOrder({ ...productOrder, price: newPrice });
        }

        return true;
    };

    const removeDataFromProduct = (index: number, productId: string) => {
        try {
            const currentProduct = productOrder.products.find(({ id }) => id === productId);
            if (currentProduct) {
                const newDataInfor = currentProduct?.dataInfo?.length > 0 ? [...currentProduct?.dataInfo] : [];
                newDataInfor.splice(index, 1);
                currentProduct.dataInfo = newDataInfor;
                currentProduct.totalMeterial = newDataInfor.reduce((prev: number, cur: any) => {
                    const total = cur?.total();
                    return prev + Number(total ?? 0);
                }, 0);
                currentProduct.totalPrice = currentProduct.totalMeterial * currentProduct.price;

                const newPrice = productOrder.products.reduce((prev, cur) => prev + Number(cur?.totalPrice), 0);
                setProductOrder({ ...productOrder, price: newPrice });
            }
        } catch (error) {
            toast.show({ title: 'Xoá dữ liệu lỗi', placement: 'bottom' });
        }
    };

    const updateDataFromProduct = (index: number, productId: string, data: ProductInformation) => {
        try {
            const currentProduct = productOrder.products.find(({ id }) => id === productId)!;
            const newDataInfor = currentProduct?.dataInfo?.length > 0 ? [...currentProduct?.dataInfo] : [];
            const newNewDataInforDetail = {
                ...newDataInfor[index],
                size: data?.size,
                amountSheet: Number(data?.amountSheet),
            };
            newDataInfor[index] = newNewDataInforDetail;
            currentProduct.dataInfo = newDataInfor;
            currentProduct.totalMeterial = newDataInfor.reduce((prev: number, cur: any) => {
                const total = Number(cur?.size) * Number(cur?.amountSheet) * Number(cur?.dimension);
                return prev + Number(total ?? 0);
            }, 0);
            currentProduct.totalPrice = currentProduct.totalMeterial * currentProduct.price;

            const newPrice = productOrder.products.reduce((prev, cur) => prev + Number(cur?.totalPrice), 0);
            setProductOrder({ ...productOrder, price: newPrice });
        } catch (error) {
            toast.show({ title: 'Sửa dữ liệu lỗi', placement: 'bottom' });
        }
    };

    return {
        productOrder,
        removeProduct,
        setProductOrder,
        addProductToOrder,
        updateProduct,
        addDataToProduct,
        removeDataFromProduct,
        updateDataFromProduct,
        price,
    };
};
