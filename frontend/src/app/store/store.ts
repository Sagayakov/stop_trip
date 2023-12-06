import { configureStore } from '@reduxjs/toolkit';
import { fetchAdverts } from '../../app/api/fetchAdverts';
import setLoadingSlice from '../../entities/loading/model/setLoadingSlice';
import { setIsAuthSlice } from '../../features/header/model/modalAuth/reducers/auth';
import { setIsCheckMailModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isCheckMailModalOpen';
import { setIsEnterSlice } from '../../features/header/model/modalAuth/reducers/isEnter';
import { setIsResetPasswordModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isResetPasswordModalOpen';
import { toggleModalSlice } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { fetchFavorites } from '../../app/api/fetchFavorites';


const setupStore = () =>
    configureStore({
        reducer: {
            toggleModalEnter: toggleModalSlice.reducer,
            setIsAuth: setIsAuthSlice.reducer,
            setIsEnter: setIsEnterSlice.reducer,
            setIsCheckMailModalOpen: setIsCheckMailModalOpenSlice.reducer,
            setIsResetPasswordModalOpen:
                setIsResetPasswordModalOpenSlice.reducer,
            setLoading: setLoadingSlice,
            [fetchAdverts.reducerPath]: fetchAdverts.reducer,
            [fetchFavorites.reducerPath]: fetchFavorites.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(fetchAdverts.middleware)
                .concat(fetchFavorites.middleware), //getDefaultMiddleWare это функция, которая вернет массив, и в этот массив мы добавляем еще миддлвееры которые лежат в goodsApi
    });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
