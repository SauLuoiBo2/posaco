import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from 'react-query';
import logger from '@src/utils/common/logger';
import { AUTH, auth } from '@src/queries';
import Config from 'react-native-config';
import AuthFireBase from '@react-native-firebase/auth';

import { LoginParams } from '../api/type.props';
import { ACCESS_TOKEN, TOKEN } from '../keys';
import user from '../api/user';
import { queryClient } from '../config';

// const queryClient = useQueryClient()
const { setItem, getItem, removeItem } = AsyncStorage;

// export const useQueryLogin = () =>
//     useMutation((data: LoginParams) => auth.login(data), {
//         onSuccess: async (data: any) => {
//             const { data: dataLogin, statusCode } = data?.data;
//             if (Number(statusCode) === Number(Config.CODE_SUCCESS)) {
//                 const { accessToken } = dataLogin;
//                 setItem(ACCESS_TOKEN, accessToken);
//                 queryClient.invalidateQueries(TOKEN);
//             }
//         },
//         onError: (error: any) => {
//             logger.debug('useQueryLogin error', error);
//         },
//     });

// export const useQueryProfileAuth = (token: string) =>
//     useQuery(AUTH, async () => {
//         const dataAuth = await user.prifole(token);
//         const { data } = dataAuth;
//         return data;
//     });

// export const useToken = () =>
//     useQuery(
//         TOKEN,
//         async () => {
//             const token = await AsyncStorage.getItem(ACCESS_TOKEN);
//             return token;
//         },
//         { initialData: null }
//     );

interface User {
    token: unknown;
}

export const useAuth = () => {
    const getTokenAsycnStorge = async () => {
        const token = await getItem(ACCESS_TOKEN);
        return token ?? null;
    };

    const fetchData: () => Promise<User> = async () => {
        const token = await AuthFireBase()?.currentUser?.getIdToken();
        return {
            token,
        };
    };

    const logout = async () => {
        try {
            await AuthFireBase().signOut();
            await removeItem(ACCESS_TOKEN);
            queryClient.setQueryData(AUTH, { token: null });
        } catch (error) {
            logger.error('error', error);
        }
    };

    // const login = async (confirmCode: string, otp: string) => {};

    const getAuth = () =>
        useQuery(AUTH, fetchData, {
            initialData: {
                token: getTokenAsycnStorge(),
            },
        });
    return { getAuth, logout };
};
