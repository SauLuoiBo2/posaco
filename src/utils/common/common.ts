import moment from 'moment';

import { themes } from '../themes';

import logger from './logger';
import { mockDataProduct, TYPE_INGREDIENT } from './mockData';

export const STATUS_ORDER = {
    ALL: 'ALL',
    DELIVERED: 'DELIVERED',
    CONFIRMED: 'CONFIRMED',
    TRANSPORTING: 'TRANSPORTING',
    CANCELED: 'CANCELED',
    PENDING: 'PENDING',
};

export const menuFilterOrder = [
    {
        value: STATUS_ORDER.ALL,
        label: 'Tất cả trạng thái',
    },
    {
        value: STATUS_ORDER.PENDING,
        label: 'Chờ xác nhận',
    },
    {
        value: STATUS_ORDER.CONFIRMED,
        label: 'Đã xác nhận',
    },
    {
        value: STATUS_ORDER.TRANSPORTING,
        label: 'Đang giao',
    },
    {
        value: STATUS_ORDER.DELIVERED,
        label: 'Đã giao hàng',
    },
];

export const menuFilterLiabilities = [
    {
        value: 'ALL',
        label: 'Tất cả trạng thái',
    },
    {
        value: 'DEBT',
        label: 'Phát sinh nợ',
    },
    {
        value: 'ARAISE',
        label: 'Phát sinh có',
    },
    {
        value: 'PENDING',
        label: 'Chờ xác nhận',
    },
];

export const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
    const firstChar = phoneNumberString.slice(0, 3) === '+84';
    if (firstChar) {
        const newPhone = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
        if (newPhone) {
            return `+${newPhone[1]} ${newPhone[2]} ${newPhone[3]} ${newPhone[3]}`;
        }
    }
    const match = phoneNumberString.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `${match[1]} ${match[2]}-${match[3]}`;
    }
    return null;
};

export const getDaysInMonth = (month: string | number, year: number, days: any[]) => {
    const pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');

    const dates: any = {};
    const weekendStyle = {
        customStyles: {
            text: {
                color: themes.colors.red94,
            },
        },
    };
    while (pivot.isBefore(end)) {
        days.forEach((day: string | number) => {
            dates[pivot.day(day).format('YYYY-MM-DD')] = weekendStyle;
        });
        pivot.add(7, 'days');
    }

    return dates;
};

export const getLabelByTypeValue = (type: string) => {
    logger.debug('type', type);
    const obj = Object.values(TYPE_INGREDIENT).find((item) => item.VALUES === String(type));
    return obj ? obj.LABEL : null;
};
