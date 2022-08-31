import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
});

export const asyncStoragePersistor = createAsyncStoragePersistor({
    storage: AsyncStorage,
});

// export const client = persistQueryClient({
//     queryClient,
//     persistor: asyncStoragePersistor,
// });
