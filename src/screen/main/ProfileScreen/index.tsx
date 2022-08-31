import React, { useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Button, Center, Text, VStack } from 'native-base';
import logger from '@src/utils/common/logger';
import { ACCESS_TOKEN, useToken } from '@src/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileComponent = () => {
    const { data: token } = useToken();
    logger.debug('token', token);
    const onLogout = async () => {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
    };

    return (
        <>
            <Box
                safeArea
                // h="100%"
                px={2}
                _dark={{ bg: 'warmGray.900' }}
                _light={{ bg: 'primary.100' }}
            >
                <VStack h='100%' justifyContent='center' px={2}>
                    <Center>
                        <Text fontSize='4xl' mb={4}>
                            Profile
                        </Text>
                    </Center>
                    <Center>
                        <Button onPress={onLogout} rounded='full' w='350px' h='45px' mt='8px'>
                            Logout
                        </Button>
                    </Center>
                </VStack>
            </Box>
        </>
    );
};

export const ProfileScreen = React.memo(ProfileComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
