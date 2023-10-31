import { configureStore } from '@reduxjs/toolkit';
import { toggleModalSlice } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { setIsAuthSlice } from '../../features/header/model/modalAuth/reducers/auth';
import { setIsEnterSlice } from '../../features/header/model/modalAuth/reducers/isEnter';
import { setIsCheckMailModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isCheckMailModalOpen';
import { setIsResetPasswordModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isResetPasswordModalOpen';
import setLoadingSlice from '../../entities/loading/model/setLoadingSlice';
import { lastAdvertsQuery } from '../../features/popularAdverts/api/lastAdvertsQuery';

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
            [lastAdvertsQuery.reducerPath]: lastAdvertsQuery.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(lastAdvertsQuery.middleware), //getDefaultMiddleWare это функция, которая вернет массив, и в этот массив мы добавляем еще миддлвееры которые лежат в goodsApi
    });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
