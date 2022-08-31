import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Center, HStack, Modal, Text, useTheme } from 'native-base';

import Button from '../Button';

type Props = {
    typePopup?: 'selection' | 'networkError' | 'warn';
    titlePopup: string;
    description?: string;
    titleButton1?: string;
    titleButton2?: string;
    onPressLeft?: () => void;
    onPressRight?: () => void;
};

export type ObjectRef = {
    show: () => void;
    hide: () => void;
};

const Popup: React.ForwardRefRenderFunction<ObjectRef, Props> = (
    {
        typePopup = 'networkError',
        titlePopup,
        description,
        titleButton1 = 'Đồng ý',
        titleButton2 = 'Huỷ',
        onPressLeft,
        onPressRight,
    },
    ref
) => {
    const { colors, fonts } = useTheme();
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        show: () => setVisible(true),
        hide: () => setVisible(false),
    }));
    return (
        <Modal isOpen={visible} onClose={() => setVisible(false)}>
            <Modal.Content px='0' py='16px' borderRadius={0} maxWidth='320px'>
                <Modal.Body>
                    <Center>
                        <Text fontSize='18px' fontFamily={fonts.hBold} fontWeight='bold' mb='8px' textAlign='center'>
                            {titlePopup}
                        </Text>
                        <Text
                            fontSize='14px'
                            fontFamily={fonts.sRegular}
                            color={colors.darkNeu}
                            fontWeight='normal'
                            textAlign='center'
                        >
                            {description}
                        </Text>
                    </Center>
                </Modal.Body>
                <Modal.Footer bg={colors.white}>
                    <Box w='100%'>
                        {typePopup === 'selection' ? (
                            <HStack justifyContent='space-between'>
                                <Button
                                    w='48%'
                                    // mx='6px'
                                    title={titleButton1}
                                    onPress={onPressLeft}
                                    h='48px'
                                />
                                <Button
                                    // mx='6px'
                                    w='48%'
                                    title={titleButton2}
                                    isOutline
                                    onPress={onPressRight}
                                    h='48px'
                                />
                            </HStack>
                        ) : typePopup === 'warn' ? (
                            <HStack justifyContent='space-between'>
                                <Button
                                    w='48%'
                                    bg={colors.red}
                                    // mx='6px'
                                    title={titleButton1}
                                    onPress={onPressLeft}
                                    h='48px'
                                />
                                <Button
                                    // mx='6px'
                                    w='48%'
                                    title={titleButton2}
                                    onPress={onPressRight}
                                    h='48px'
                                />
                            </HStack>
                        ) : (
                            <Button
                                title={titleButton1}
                                onPress={() => {
                                    if (onPressLeft) {
                                        onPressLeft();
                                    }
                                    return setVisible(false);
                                }}
                                h='48px'
                            />
                        )}
                    </Box>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default React.memo(forwardRef(Popup));
