import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isAuth: boolean;
    errorRegistration: ErrorRegistration | undefined;
    errorEnter: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}
interface ErrorRegistration {
    [key: string]: string
}

const initialState: InitState = {
    isAuth: false,
    errorRegistration: undefined,
    errorEnter: null,
    accessToken: null,
    refreshToken: null,
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
        setErrorRegistration: (state, action: PayloadAction<ErrorRegistration>) => {
            state.errorRegistration = action.payload;
        },
        resetErrors: (state) => {
            state.errorEnter = null;
            state.errorRegistration = undefined;
        },
        setAccessToken: (state, action: PayloadAction<string>) =>{
            state.accessToken = action.payload
        }
    },
});

export default setIsAuthSlice.reducer;
export const { setIsAuth, setErrorEnter, resetErrors, setErrorRegistration } = setIsAuthSlice.actions;
