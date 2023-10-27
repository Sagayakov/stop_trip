import { configureStore } from '@reduxjs/toolkit';
import { toggleModalSlice } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { setIsAuthSlice } from '../../features/header/model/modalAuth/reducers/auth';
import { setIsEnterSlice } from '../../features/header/model/modalAuth/reducers/isEnter';
import { setIsCheckMailModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isCheckMailModalOpen';
import { setIsResetPasswordModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isResetPasswordModalOpen';
import setLoadingSlice from '../../entities/loading/model/setLoadingSlice';

const setupStore = () =>
    configureStore({
        reducer: {
            toggleModalEnter: toggleModalSlice.reducer,
            setIsAuth: setIsAuthSlice.reducer,
            setIsEnter: setIsEnterSlice.reducer,
            setIsCheckMailModalOpen: setIsCheckMailModalOpenSlice.reducer,
            setIsResetPasswordModalOpen:
                setIsResetPasswordModalOpenSlice.reducer,
            setLoading: setLoadingSlice
        },
    });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
