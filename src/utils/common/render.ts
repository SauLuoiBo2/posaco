import { images } from '@src/assets';

import { themes } from '../themes';

export const renderColorStatus = (status: string) => {
    if (status === 'DELIVERED') {
        return themes.colors.green;
    }
    if (status === 'CANCELED') {
        return themes.colors.red;
    }
    return themes.colors.orange;
};

export const renderNameStatus = (status: string) => {
    if (status === 'PENDING') {
        return 'Chờ xác nhận'; // Chờ xác nhận
    }

    if (status === 'TRANSPORTING') {
        return 'Đang vận chuyển'; // Đang vận chuyển
    }
    if (status === 'CONFIRMED') {
        return 'Đã Xác nhận'; // Đã Xác nhận
    }

    if (status === 'CANCELED') {
        return 'Đã Huỷ'; // Đã Huỷ
    }

    return 'Đã giao hàng'; // DELIVERED - Đã giao hàng
};

export const renderImage = (status: string) => {
    if (status === 'PENDING') {
        return images.orderPending; // Chờ xác nhận
    }

    if (status === 'TRANSPORTING') {
        return images.orderTransporting; // Đang vận chuyển
    }
    if (status === 'CONFIRMED') {
        return images.orderConfirmed; // Đã Xác nhận
    }

    if (status === 'CANCELED') {
        return images.orderCanceled; // Đã Huỷ
    }

    return images.orderDelivered; // DELIVERED - Đã giao hàng
};
