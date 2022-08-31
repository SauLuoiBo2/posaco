/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text, Box, useTheme, Button, HStack } from 'native-base';
import { Icon, Image, scale, vScale } from '@src/components';
import { Colors } from '@src/utils/themes/Colors';
import { images } from '@src/assets';
import logger from '@src/utils/common/logger';

function TabBarCustom({ state, descriptors, navigation }: any) {
    const { colors, fonts } = useTheme();
    const tabarVisible = state.index === 2 ? 'none' : 'flex';
    logger.debug('vScale(80)', vScale(80));

    return (
        <HStack
            alignItems='flex-start'
            bg={colors.white}
            style={[styles.container]}
            display={tabarVisible}
            justifyContent='space-between'
        >
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel;
                const { iconActive, iconDeactivate } = options;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.name,
                        canPreventDefault: true,
                    });
                    if (event.target === 'CreateOrderTab') {
                        return navigation.navigate('CreateOrderScreen');
                    }
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                return (
                    <Button
                        alignItems='center'
                        justifyContent='center'
                        key={index}
                        variant='unstyled'
                        display='flex'
                        onPress={onPress}
                    >
                        <Box alignItems='center' style={styles.wrapItemBottom}>
                            {index === 2 ? (
                                <Image source={images.tabCreate} style={styles.iconCreate} />
                            ) : (
                                <Icon
                                    name={isFocused ? iconDeactivate : iconActive}
                                    color={isFocused ? Colors.blue : Colors.darkNeu}
                                    type='AntDesign'
                                    size={25}
                                />
                            )}
                        </Box>

                        <Text
                            fontSize='14px'
                            fontFamily={isFocused ? fonts.hMedium : fonts.hRegular}
                            color={isFocused ? colors.blue : colors.darkNeu}
                        >
                            {label}
                        </Text>
                    </Button>
                );
            })}
        </HStack>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: { height: -0.5 },
                shadowOpacity: 0.18,
                shadowRadius: 1,
                height: vScale(80),
                paddingTop: vScale(10),
            },
            android: {
                borderColor: Colors.light,
                borderTopWidth: 1,
            },
        }),
    },
    wrapItemBottom: {
        height: vScale(28),
    },
    iconCreate: {
        width: scale(60),
        height: scale(55),
        position: 'absolute',
        top: vScale(-28),
        shadowColor: Colors.black,
        shadowOpacity: 0.18,
        shadowRadius: 1,
        elevation: 2,
    },
});

export default TabBarCustom;
