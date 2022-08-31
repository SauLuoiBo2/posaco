import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, useTheme } from 'native-base';
import { useForm } from 'react-hook-form';

import { Icon } from '../Icon';
import { InputForm } from '../InputForm';
import { scale, vScale } from '../ScaleSheet';

type Props = {
    placeholder?: string;
};

const SearchBar = ({ placeholder = 'Tìm kiếm' }: Props) => {
    const { colors } = useTheme();
    const { control } = useForm();
    return (
        <Box
            w='full'
            pl={`${scale(10)}px`}
            pr={`${scale(15)}px`}
            my={`${vScale(10)}px`}
            bg={colors.light}
            h='40px'
            position='relative'
            justifyContent='center'
        >
            <Box position='absolute' zIndex={2} ml='6px'>
                <Icon name='search' color={colors.darkNeu} size={25} />
            </Box>
            <InputForm
                control={control}
                name='search'
                placeholder={placeholder}
                fontWeight='bold'
                fontFamily='hMedium'
                placeholderTextColor={colors.darkNeu}
                w='100%'
                pl='32px'
                fontSize='16px'
            />
        </Box>
    );
};

export default React.memo(SearchBar);

const styles = StyleSheet.create({});
