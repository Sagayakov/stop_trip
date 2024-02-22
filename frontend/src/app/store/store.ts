import { configureStore } from '@reduxjs/toolkit';
import { fetchAdverts } from 'app/api/fetchAdverts.ts';
import setLoadingSlice from '../../entity/loading/model/setLoadingSlice';
import { setIsAuthSlice } from 'features/header/model/modalAuth/reducers/auth.ts';
import { setIsCheckMailModalOpenSlice } from 'features/header/model/modalAuth/reducers/isCheckMailModalOpen.ts';
import { setIsEnterSlice } from 'features/header/model/modalAuth/reducers/isEnter.ts';
import { setIsResetPasswordModalOpenSlice } from 'features/header/model/modalAuth/reducers/isResetPasswordModalOpen.ts';
import { toggleModalSlice } from 'features/header/model/modalAuth/reducers/toggleModal.ts';
import { fetchFavorites } from 'app/api/fetchFavorites.ts';
import { setLangSlice } from 'features/header/model/langsReducer/lang.ts';
import { setPageMainSlice } from 'widgets/lastAdverts/model/pageReducer/pageMain';
import { setPageCategorySlice } from 'pages/categoryPage/model/pageReducer/pageCategory';
import { fetchRating } from 'app/api/fetchRating';
import { fetchUser } from 'app/api/fetchUser.ts';
import { fetchMessengers } from 'app/api/fetchMessengers';
import { authFetchAdverts } from 'app/api/authFetchAdverts.ts';

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
            setLang: setLangSlice.reducer,
            setPageMain: setPageMainSlice.reducer,
            setPageCategory: setPageCategorySlice.reducer,
            [fetchAdverts.reducerPath]: fetchAdverts.reducer,
            [fetchFavorites.reducerPath]: fetchFavorites.reducer,
            [fetchRating.reducerPath]: fetchRating.reducer,
            [fetchUser.reducerPath]: fetchUser.reducer,
            [fetchMessengers.reducerPath]: fetchMessengers.reducer,
            [authFetchAdverts.reducerPath]: authFetchAdverts.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(fetchUser.middleware)
                .concat(fetchAdverts.middleware)
                .concat(fetchFavorites.middleware)
                .concat(fetchRating.middleware)
                .concat(fetchMessengers.middleware)
                .concat(authFetchAdverts.middleware),
    });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
