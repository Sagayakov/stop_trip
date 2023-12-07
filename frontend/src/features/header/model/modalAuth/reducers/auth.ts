import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isAuth: boolean;
    errorRepeatEmail: boolean
    errorEnter: string | null
}

const initialState: InitState = {
    isAuth: false,
    errorRepeatEmail: false,
    errorEnter: null
};

export const setIsAuthSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },

        setErrorEnter: (state, action: PayloadAction<string>) => {
            state.errorEnter = action.payload;
        },
        setErrorRepeatEmail: (state, action: PayloadAction<boolean>) => {
            state.errorRepeatEmail = action.payload;
        },
        resetErrors: (state) => {
            state.errorEnter = null;
            state.errorRepeatEmail = false;
        },
    },
});

export default setIsAuthSlice.reducer;
export const { setIsAuth, setErrorEnter, resetErrors, setErrorRepeatEmail } = setIsAuthSlice.actions;
