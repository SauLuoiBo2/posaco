import React, { useEffect, useState, ReactElement } from 'react';
import logger from '@src/utils/common/logger';
import { ACCESS_TOKEN, AUTH, IS_LOGIN, useGlobalState } from '@src/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEqual from 'react-fast-compare';
import { useQueryClient } from 'react-query';
import { AuthState } from '@src/queries/hooks/type.state';

interface Props {
    children: ReactElement;
}

const AuthProviderComponent = ({ children }: Props) => {
    const queryClient = useQueryClient();
    const { getItem }: any = AsyncStorage;
    const [isLogin, setIsLogin] = useGlobalState<boolean>(IS_LOGIN);
    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
        if (token) {
            // useAuth();
            queryClient.setQueryData(AUTH, (old) => ({
                ...(old as AuthState),
                token,
            }));
        }
    });

    const getToken = async () => {
        const token = await getItem(ACCESS_TOKEN);
        if (!token) {
            setIsLogin(false);
        }
    };

    useEffect(() => {
        logger.debug('isLogin', isLogin);
        getToken();
    }, []);

    return <>{children}</>;
};

export const AuthProvider = React.memo(AuthProviderComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
