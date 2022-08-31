import { images } from '@src/assets';

import { themes } from '../themes';

export const TYPE_INGREDIENT = {
    TYPE_ROOF: {
        VALUES: 'type_roof',
        LABEL: 'Loại',
    },
    TYPE_WAVE: {
        VALUES: 'type_wave',
        LABEL: 'Kiểu sóng',
    },
    TYPE_STYROFOAM: {
        VALUES: 'type_styrofoam',
        LABEL: 'Loại xốp',
    },
    COLORS: {
        VALUES: 'colors',
        LABEL: 'Màu',
    },
    THICKNESS: {
        VALUES: 'thickness',
        LABEL: 'Độ dày',
    },
    PANEL_SIZE: {
        VALUES: 'panel_size',
        LABEL: 'Khổ Panel',
    },
    SURFACE: {
        VALUES: 'surface',
        LABEL: 'Bề mặt',
    },
    TYPE_ACCESSORY: {
        VALUES: 'type_accessory',
        LABEL: 'Kiểu phụ kiện',
    },
    SIZE: {
        VALUES: 'size',
        LABEL: 'Khổ',
    },
};

export const mockDataProduct = [
    {
        id: 'ton-can-song',
        title: 'Tôn Cán Sóng',
        brand: [
            {
                id: 'poshaco',
                title: 'Poshaco',
                specifications: {
                    [TYPE_INGREDIENT.TYPE_ROOF.VALUES]: [
                        {
                            id: 'ton-1-lop',
                            title: 'Tôn 1 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'ton-3-lop',
                            title: 'Tôn 3 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 25000,
                        },
                        {
                            id: 'ton-vom',
                            title: 'Tôn Vòm',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'ton-phang',
                            title: 'Tôn phẳng',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 30000,
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_WAVE.VALUES]: [
                        {
                            id: '11-song',
                            title: '11 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: '6-song',
                            title: '6 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: 'song-ngoi',
                            title: 'Sóng ngói',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                image: images.woodBold,
                            },
                            price: 35000,
                            parent: ['ton-1-lop', 'ton-3-lop'],
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES]: [
                        {
                            id: 'ge',
                            title: 'GE',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g8',
                            title: 'G8',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g7',
                            title: 'G7',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 40000,
                            parent: ['ton-3-lop-11-song', 'ton-3-lop-6-song'],
                        },
                        {
                            id: 'g-1',
                            title: 'G*',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 35000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g-2',
                            title: 'G**',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 36000,
                            parent: ['ton-3-lop-11-song'],
                        },
                    ],
                },
                properties: {
                    [TYPE_INGREDIENT.COLORS.VALUES]: [
                        {
                            id: 'red',
                            title: 'Đỏ',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 20000,
                        },
                        {
                            id: 'moss',
                            title: 'Rêu',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 21000,
                        },
                        {
                            id: 'red-2',
                            title: 'Đỏ',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: themes.colors.red,
                            },
                            price: 22000,
                        },
                        {
                            id: 'blue',
                            title: 'Dương',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0E4DB4',
                            },
                            price: 23000,
                        },
                        {
                            id: 'white',
                            title: 'Trắng',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFFFED',
                            },
                            price: 24000,
                        },
                        {
                            id: 'black',
                            title: 'Black',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#505750',
                            },
                            price: 25000,
                        },
                        {
                            id: 'B01',
                            title: 'B01',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0B649E',
                            },
                            price: 21000,
                        },
                        {
                            id: 'B02',
                            title: 'B02',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#C6C4AF',
                            },
                            price: 22000,
                        },
                        {
                            id: 'B04',
                            title: 'B04',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#1E666B',
                            },
                            price: 20000,
                        },
                    ],
                    [TYPE_INGREDIENT.THICKNESS.VALUES]: [
                        {
                            id: 'thick-01',
                            title: '0.30mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'thick-02',
                            title: '0.32mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-03',
                            title: '0.35mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-04',
                            title: '0.37mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-05',
                            title: '0.40mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-06',
                            title: '0.42mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-07',
                            title: '0.45mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 24000,
                        },
                        {
                            id: 'thick-08',
                            title: '0.47mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 30000,
                        },
                        {
                            id: 'thick-09',
                            title: '0.50mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                    ],
                },
            },
            {
                id: 'sssc',
                title: 'SSSC',
                specifications: {
                    [TYPE_INGREDIENT.TYPE_ROOF.VALUES]: [
                        {
                            id: 'ton-1-lop',
                            title: 'Tôn 1 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'ton-3-lop',
                            title: 'Tôn 3 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 25000,
                        },
                        {
                            id: 'ton-vom',
                            title: 'Tôn Vòm',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'ton-phang',
                            title: 'Tôn phẳng',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 30000,
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_WAVE.VALUES]: [
                        {
                            id: '11-song',
                            title: '11 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: '6-song',
                            title: '6 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: 'song-ngoi',
                            title: 'Sóng ngói',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                image: images.woodBold,
                            },
                            price: 35000,
                            parent: ['ton-1-lop', 'ton-3-lop'],
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES]: [
                        {
                            id: 'ge',
                            title: 'GE',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g8',
                            title: 'G8',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g7',
                            title: 'G7',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 40000,
                            parent: ['ton-3-lop-11-song', 'ton-3-lop-6-song'],
                        },
                        {
                            id: 'g-1',
                            title: 'G*',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 35000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g-2',
                            title: 'G**',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 36000,
                            parent: ['ton-3-lop-11-song'],
                        },
                    ],
                },
                properties: {
                    [TYPE_INGREDIENT.COLORS.VALUES]: [
                        {
                            id: 'moss',
                            title: 'Rêu',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 21000,
                        },
                        {
                            id: 'red',
                            title: 'Đỏ',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 20000,
                        },
                        {
                            id: 'blue',
                            title: 'Dương',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0E4DB4',
                            },
                            price: 23000,
                        },
                        {
                            id: 'black',
                            title: 'Black',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#505750',
                            },
                            price: 25000,
                        },
                        {
                            id: 'diamond',
                            title: 'Kim Cương',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0B649E',
                            },
                            price: 24000,
                        },

                        {
                            id: 'BE',
                            title: 'Be',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFF2C3',
                            },
                            price: 20000,
                        },
                    ],
                    [TYPE_INGREDIENT.THICKNESS.VALUES]: [
                        {
                            id: 'thick-01',
                            title: '0.35mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'thick-02',
                            title: '0.40mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-03',
                            title: '0.45mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                    ],
                },
            },
            {
                id: 'suntex',
                title: 'Suntex',
                specifications: {
                    [TYPE_INGREDIENT.TYPE_ROOF.VALUES]: [
                        {
                            id: 'ton-1-lop',
                            title: 'Tôn 1 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'ton-3-lop',
                            title: 'Tôn 3 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 25000,
                        },
                        {
                            id: 'ton-vom',
                            title: 'Tôn Vòm',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'ton-phang',
                            title: 'Tôn phẳng',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 30000,
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_WAVE.VALUES]: [
                        {
                            id: '11-song',
                            title: '11 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: '6-song',
                            title: '6 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: 'song-ngoi',
                            title: 'Sóng ngói',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                image: images.woodBold,
                            },
                            price: 35000,
                            parent: ['ton-1-lop', 'ton-3-lop'],
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES]: [
                        {
                            id: 'ge',
                            title: 'GE',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g8',
                            title: 'G8',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g7',
                            title: 'G7',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 40000,
                            parent: ['ton-3-lop-11-song', 'ton-3-lop-6-song'],
                        },
                        {
                            id: 'g-1',
                            title: 'G*',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 35000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g-2',
                            title: 'G**',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 36000,
                            parent: ['ton-3-lop-11-song'],
                        },
                    ],
                },
                properties: {
                    [TYPE_INGREDIENT.COLORS.VALUES]: [
                        {
                            id: 'moss',
                            title: 'Rêu',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 21000,
                        },
                        {
                            id: 'red',
                            title: 'Đỏ',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 20000,
                        },
                        {
                            id: 'blue',
                            title: 'Dương',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0E4DB4',
                            },
                            price: 23000,
                        },
                        {
                            id: 'black',
                            title: 'Black',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#505750',
                            },
                            price: 25000,
                        },
                        {
                            id: 'white',
                            title: 'Trắng',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFFFED',
                            },
                            price: 24000,
                        },
                    ],
                    [TYPE_INGREDIENT.THICKNESS.VALUES]: [
                        {
                            id: 'thick-01',
                            title: '0.35mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'thick-02',
                            title: '0.40mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-03',
                            title: '0.45mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                    ],
                },
            },
            {
                id: 'hoa-phat',
                title: 'Hoà phát',
                specifications: {
                    [TYPE_INGREDIENT.TYPE_ROOF.VALUES]: [
                        {
                            id: 'ton-1-lop',
                            title: 'Tôn 1 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'ton-3-lop',
                            title: 'Tôn 3 lớp',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 25000,
                        },
                        {
                            id: 'ton-vom',
                            title: 'Tôn Vòm',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'ton-phang',
                            title: 'Tôn phẳng',
                            type: TYPE_INGREDIENT.TYPE_ROOF.VALUES,
                            price: 30000,
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_WAVE.VALUES]: [
                        {
                            id: '11-song',
                            title: '11 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: '6-song',
                            title: '6 sóng',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 30000,
                            parent: ['ton-1-lop', 'ton-3-lop', 'ton-vom'],
                        },
                        {
                            id: 'song-ngoi',
                            title: 'Sóng ngói',
                            type: TYPE_INGREDIENT.TYPE_WAVE.VALUES,
                            value: {
                                image: images.woodBold,
                            },
                            price: 35000,
                            parent: ['ton-1-lop', 'ton-3-lop'],
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES]: [
                        {
                            id: 'ge',
                            title: 'GE',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g8',
                            title: 'G8',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 32000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g7',
                            title: 'G7',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 40000,
                            parent: ['ton-3-lop-11-song', 'ton-3-lop-6-song'],
                        },
                        {
                            id: 'g-1',
                            title: 'G*',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 35000,
                            parent: ['ton-3-lop-11-song'],
                        },
                        {
                            id: 'g-2',
                            title: 'G**',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 36000,
                            parent: ['ton-3-lop-11-song'],
                        },
                    ],
                },
                properties: {
                    [TYPE_INGREDIENT.COLORS.VALUES]: [
                        {
                            id: 'moss',
                            title: 'Rêu',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 21000,
                        },
                        {
                            id: 'red',
                            title: 'Đỏ',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 20000,
                        },
                        {
                            id: 'blue',
                            title: 'Dương',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0E4DB4',
                            },
                            price: 23000,
                        },
                        {
                            id: 'black',
                            title: 'Black',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#505750',
                            },
                            price: 25000,
                        },
                        {
                            id: 'white',
                            title: 'Trắng',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFFFED',
                            },
                            price: 24000,
                        },
                    ],
                    [TYPE_INGREDIENT.THICKNESS.VALUES]: [
                        {
                            id: 'thick-01',
                            title: '0.25mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'thick-02',
                            title: '0.30mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-03',
                            title: '0.32mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-04',
                            title: '0.35mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'thick-05',
                            title: '0.37mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-06',
                            title: '0.40mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-07',
                            title: '0.45mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'panel-eps',
        title: 'Panel EPS',
        brand: [
            {
                id: 'poshaco',
                title: 'Poshaco',
                specifications: {
                    [TYPE_INGREDIENT.PANEL_SIZE.VALUES]: [
                        {
                            id: '1020',
                            title: '1020',
                            type: TYPE_INGREDIENT.PANEL_SIZE.VALUES,
                            price: 3000,
                        },
                        {
                            id: '1170',
                            title: '1170',
                            type: TYPE_INGREDIENT.PANEL_SIZE.VALUES,
                            price: 2000,
                        },
                    ],
                    [TYPE_INGREDIENT.SURFACE.VALUES]: [
                        {
                            id: 'plane',
                            title: 'Phẳng',
                            type: TYPE_INGREDIENT.SURFACE.VALUES,
                            price: 3000,
                        },
                        {
                            id: 'sinewy',
                            title: 'Gân',
                            type: TYPE_INGREDIENT.SURFACE.VALUES,
                            price: 5000,
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES]: [
                        {
                            id: 'medium-50t',
                            title: 'Xốp thường 50T',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 5000,
                        },
                        {
                            id: 'fire-protection-50t',
                            title: 'Xốp chống cháy 50T',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 7000,
                        },
                    ],
                },
                properties: {
                    [TYPE_INGREDIENT.COLORS.VALUES]: [
                        {
                            id: 'white-milk',
                            title: 'Trắng sữa',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFFFED',
                            },
                            price: 2000,
                        },
                        {
                            id: 'yellow-cream',
                            title: 'Vàng kem',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFF6C9',
                            },
                            price: 2000,
                        },
                    ],
                    [TYPE_INGREDIENT.THICKNESS.VALUES]: [
                        {
                            id: 'thick-01',
                            title: '0.30mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 23000,
                        },
                        {
                            id: 'thick-02',
                            title: '0.35mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'thick-03',
                            title: '0.40mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 20000,
                        },
                    ],
                },
            },
            {
                id: 'suntex',
                title: 'Suntex',
                specifications: {
                    [TYPE_INGREDIENT.PANEL_SIZE.VALUES]: [
                        {
                            id: '1020',
                            title: '1020',
                            type: TYPE_INGREDIENT.PANEL_SIZE.VALUES,
                            price: 3000,
                        },
                        {
                            id: '1170',
                            title: '1170',
                            type: TYPE_INGREDIENT.PANEL_SIZE.VALUES,
                            price: 2000,
                        },
                    ],
                    [TYPE_INGREDIENT.SURFACE.VALUES]: [
                        {
                            id: 'plane',
                            title: 'Phẳng',
                            type: TYPE_INGREDIENT.SURFACE.VALUES,
                            price: 3000,
                        },
                        {
                            id: 'sinewy',
                            title: 'Gân',
                            type: TYPE_INGREDIENT.SURFACE.VALUES,
                            price: 5000,
                        },
                    ],
                    [TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES]: [
                        {
                            id: 'medium-50t',
                            title: 'Xốp thường 50T',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 5000,
                        },
                        {
                            id: 'fire-protection-50t',
                            title: 'Xốp chống cháy 50T',
                            type: TYPE_INGREDIENT.TYPE_STYROFOAM.VALUES,
                            price: 7000,
                        },
                    ],
                },
                properties: {
                    [TYPE_INGREDIENT.COLORS.VALUES]: [
                        {
                            id: 'wood-grain',
                            title: 'Vân gỗ nhạt',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                image: images.woodBold,
                            },
                            price: 2000,
                        },
                        {
                            id: 'white-milk',
                            title: 'Trắng sữa',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFFFED',
                            },
                            price: 2000,
                        },
                        {
                            id: 'yellow-cream',
                            title: 'Vàng kem',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFF6C9',
                            },
                            price: 2000,
                        },
                    ],
                    [TYPE_INGREDIENT.THICKNESS.VALUES]: [
                        {
                            id: 'thick-01',
                            title: '0.25mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 15000,
                            parent: ['wood-grain', 'white-milk', 'yellow-cream'],
                        },
                        {
                            id: 'thick-02',
                            title: '0.30mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 10000,
                            parent: ['white-milk', 'yellow-cream'],
                        },
                        {
                            id: 'thick-03',
                            title: '0.35mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 12000,
                            parent: ['white-milk', 'yellow-cream'],
                        },
                        {
                            id: 'thick-04',
                            title: '0.40mm',
                            type: TYPE_INGREDIENT.THICKNESS.VALUES,
                            price: 15000,
                            parent: ['white-milk', 'yellow-cream'],
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'panel-tran-36',
        title: 'Panel Trần 36',
        brand: [],
    },
    {
        id: 'pk-mai',
        title: 'PK Mái',
        brand: [
            {
                id: 'poshaco',
                title: 'Poshaco',
                specifications: {
                    [TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES]: [
                        {
                            id: 'suon',
                            title: 'Sườn',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 10000,
                        },
                        {
                            id: 'noc',
                            title: 'Nóc',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 20000,
                        },
                        {
                            id: 'mang',
                            title: 'Máng',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 10000,
                        },
                        {
                            id: 'xoi',
                            title: 'Xối',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 8000,
                        },
                        {
                            id: 'phao',
                            title: 'Phào',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 14000,
                        },
                        {
                            id: 'phao-kep',
                            title: 'Phào kép',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 15000,
                        },
                        {
                            id: 'pk-suon-vom',
                            title: 'PK sườn vòm',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 30000,
                        },
                        {
                            id: 'pk-theo-hinh-ve',
                            title: 'PK theo hình vẽ',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            haveUpload: true,
                            price: 100000,
                        },
                        {
                            id: 'phang-kho',
                            title: 'Phẳng khổ',
                            type: TYPE_INGREDIENT.TYPE_ACCESSORY.VALUES,
                            price: 30000,
                        },
                    ],
                    [TYPE_INGREDIENT.SIZE.VALUES]: [
                        {
                            id: '240',
                            title: '240',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '300',
                            title: '300',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '400',
                            title: '400',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '480',
                            title: '480',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '600',
                            title: '600',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '720',
                            title: '720',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '800',
                            title: '800',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '900',
                            title: '900',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                        {
                            id: '960',
                            title: '960',
                            type: TYPE_INGREDIENT.SIZE.VALUES,
                            price: 5000,
                        },
                    ],
                },
                properties: {
                    [TYPE_INGREDIENT.COLORS.VALUES]: [
                        {
                            id: 'red',
                            title: 'Đỏ',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#7F0B0C',
                            },
                            price: 20000,
                        },
                        {
                            id: 'moss',
                            title: 'Rêu',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#1C4837',
                            },
                            price: 21000,
                        },
                        {
                            id: 'red-2',
                            title: 'Đỏ',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: themes.colors.red,
                            },
                            price: 22000,
                        },
                        {
                            id: 'blue',
                            title: 'Dương',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0E4DB4',
                            },
                            price: 23000,
                        },
                        {
                            id: 'white',
                            title: 'Trắng',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#FFFFED',
                            },
                            price: 24000,
                        },
                        {
                            id: 'black',
                            title: 'Black',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#505750',
                            },
                            price: 25000,
                        },
                        {
                            id: 'B01',
                            title: 'B01',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#0B649E',
                            },
                            price: 21000,
                        },
                        {
                            id: 'B02',
                            title: 'B02',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#C6C4AF',
                            },
                            price: 22000,
                        },
                        {
                            id: 'B04',
                            title: 'B04',
                            type: TYPE_INGREDIENT.COLORS.VALUES,
                            value: {
                                color: '#1E666B',
                            },
                            price: 20000,
                        },
                    ],
                },
            },
            {
                id: 'sssc',
                title: 'SSSC',
            },
            {
                id: 'suntex',
                title: 'Suntex',
            },
            {
                id: 'hoa-phat',
                title: 'Hoà phát',
            },
            {
                id: 'inox',
                title: 'Inox',
            },
        ],
    },
    {
        id: 'pk-khac',
        title: 'PK khác',
        brand: [],
        accessory: [
            {
                id: 'pk-gia-ngoi',
                title: 'Pk Giả ngói',
            },
            {
                id: 'pk-tran-36',
                title: 'Pk Giả ngói',
            },
            {
                id: 'pk-panel-eps',
                title: 'Pk Panel EPS',
            },
        ],
    },
];

export const mockDataBrand = [
    {
        id: 'poshaco',
        title: 'Poshaco',
    },
    {
        id: 'sssc',
        title: 'SSSC',
    },
    {
        id: 'suntex',
        title: 'Suntex',
    },
    {
        id: 'hoa-phat',
        title: 'Hoà phát',
    },
    {
        id: 'inox',
        title: 'Inox',
    },
];
