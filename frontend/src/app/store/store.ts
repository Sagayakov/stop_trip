import { configureStore } from '@reduxjs/toolkit';
import { toggleModalSlice } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { setIsAuthSlice } from '../../features/header/model/modalAuth/reducers/auth';

const setupStore = () =>
    configureStore({
        reducer: {
            toggleModalEnter: toggleModalSlice.reducer,
            setIsAuth: setIsAuthSlice.reducer,
        },
    });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
