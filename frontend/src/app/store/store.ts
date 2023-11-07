import { configureStore } from '@reduxjs/toolkit';
import setLoadingSlice from '../../entities/loading/model/setLoadingSlice';
import { setIsAuthSlice } from '../../features/header/model/modalAuth/reducers/auth';
import { setIsCheckMailModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isCheckMailModalOpen';
import { setIsEnterSlice } from '../../features/header/model/modalAuth/reducers/isEnter';
import { setIsResetPasswordModalOpenSlice } from '../../features/header/model/modalAuth/reducers/isResetPasswordModalOpen';
import { toggleModalSlice } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { fetchAdverts } from '../../app/api/fetchAdverts';
import { closeTransportFormDropdownClice } from '../../features/settingCategoryForm/settingTransportForm/reducer/closeTransportFormDropdown';



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
            closeTransportFormDropdown: closeTransportFormDropdownClice.reducer//не смотри, там жесть
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(fetchAdverts.middleware), //getDefaultMiddleWare это функция, которая вернет массив, и в этот массив мы добавляем еще миддлвееры которые лежат в goodsApi
    });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
