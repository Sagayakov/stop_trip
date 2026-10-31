import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'selected_city';

// Выбранный город запоминается в браузере, чтобы при следующем заходе лента была та же.
// localStorage может быть недоступен (приватный режим) — тогда просто не запоминаем.
const readStoredCity = (): string | null => {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
};

const storeCity = (slug: string | null) => {
    try {
        if (slug) localStorage.setItem(STORAGE_KEY, slug);
        else localStorage.removeItem(STORAGE_KEY);
    } catch {
        // не страшно: выбор просто не сохранится между заходами
    }
};

interface InitState {
    /** slug города или null — «Весь Вьетнам» */
    city: string | null;
}

const initialState: InitState = { city: readStoredCity() };

export const selectedCitySlice = createSlice({
    name: 'selectedCity',
    initialState,
    reducers: {
        setSelectedCity: (state, action: PayloadAction<string | null>) => {
            state.city = action.payload;
            storeCity(action.payload);
        },
    },
});

export const { setSelectedCity } = selectedCitySlice.actions;
