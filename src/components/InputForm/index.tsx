import React from 'react';
import isEqual from 'react-fast-compare';
import { Box, Input, useTheme, Text, VStack, IInputProps } from 'native-base';
import { Controller } from 'react-hook-form';

interface Props extends IInputProps {
    title?: string;
    placeholder: string;
    control?: any;
    rules?: any;
    name: string;
}

const InputFormComponent = (props: Props) => {
    const { title, placeholder = 'placeholder', control, rules, mt, name, bg, ...rest } = props;
    const { colors } = useTheme();
    return (
        <Box alignItems='center' w='100%' mt={mt}>
            <VStack w='100%'>
                {title && (
                    <Text fontSize='14px' mb='4px' pb='0'>
                        {title}
                    </Text>
                )}
                {control && (
                    <Controller
                        control={control}
                        rules={rules}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                h='40px'
                                bg={bg ?? colors.holderInput}
                                borderRadius={0}
                                borderColor={colors.trans}
                                placeholder={placeholder}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                // dataDetectorTypes={isNumber}
                                value={value}
                                w='100%'
                                {...rest}
                            />
                        )}
                        name={name}
                    />
                )}
            </VStack>
        </Box>
    );
};

export const InputForm = React.memo(InputFormComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
