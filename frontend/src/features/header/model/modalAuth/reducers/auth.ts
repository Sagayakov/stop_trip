import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isAuth: boolean;
    errorEmail: ErrorEmail | null
    errorEnter: string | null
}
interface ErrorEmail {
    email: string[]
}

const initialState: InitState = {
    isAuth: false,
    errorEmail: null,
    errorEnter: null
};

export const setIsAuthSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setErrorEmail: (state, action: PayloadAction<ErrorEmail>) => {
            state.errorEmail = action.payload;
        },
        setErrorEnter: (state) => {
            state.errorEnter = 'Неверный логин или пароль';
        },
        resetErrors: (state) => {
            state.errorEmail = null;
            state.errorEnter = null;
            state.errorEnter = null
        },
    },
});

export default setIsAuthSlice.reducer;
export const { setIsAuth, setErrorEmail, setErrorEnter, resetErrors } = setIsAuthSlice.actions;
