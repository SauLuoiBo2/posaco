import React from 'react';
import { Icon as IconNB } from 'native-base';
import isEqual from 'react-fast-compare';
import { TouchableWithoutFeedback } from 'react-native';
import logger from '@src/utils/common/logger';

import Icomoon, { names } from './Icomoon';

// type Props = {
//     onPress?: any;
//     name: string;
//     color: string;
//     size: number;
//     fontWeight?: string;
//     type?:
//         | 'AntDesign'
//         | 'Entypo'
//         | 'EvilIcons'
//         | 'Feather'
//         | 'FontAwesome'
//         | 'FontAwesome5'
//         | 'Foundation'
//         | 'Ionicons'
//         | 'MaterialCommunityIcons'
//         | 'MaterialIcons'
//         | 'Octicons'
//         | 'SimpleLineIcons'
//         | 'Zocial';
//     style?: StyleProp<TextStyle>;
// };

const IconComponent = ({ onPress, ...props }: any) => {
    const { name, size = 20, style, color, fontWeight = '900', type = 'Ionicons', ...rest } = props;
    const IconImage = () =>
        names.indexOf(name) !== -1 ? (
            <Icomoon
                {...props}
                style={[
                    style,
                    {
                        fontSize: size,
                        color,
                        fontWeight,
                    },
                ]}
            />
        ) : (
            <IconNB {...rest} type={type} name={name} style={[style, { fontSize: size, color, fontWeight }]} />
        );
    return onPress ? (
        <TouchableWithoutFeedback onPress={onPress}>
            <IconImage />
        </TouchableWithoutFeedback>
    ) : (
        <IconImage />
    );
};

export const Icon = React.memo(IconComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
