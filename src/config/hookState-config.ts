import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

export const globalState = createState({
    isLogin: false,
    dataOrder: [],
});

globalState.attach(Persistence('plugin-persisted-data-key'));
