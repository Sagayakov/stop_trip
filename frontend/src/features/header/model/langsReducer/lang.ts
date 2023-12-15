import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Lang = 'en' | 'ru';

interface InitState {
    lang: Lang;
}

const initialState: InitState = {
    lang: (localStorage.getItem('lang') as Lang) ?? 'ru',
};

export const setLangSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLang: (state, action: PayloadAction<Lang>) => {
            state.lang = action.payload;
        },
    },
});

export default setLangSlice.reducer;
export const { setLang } = setLangSlice.actions;
