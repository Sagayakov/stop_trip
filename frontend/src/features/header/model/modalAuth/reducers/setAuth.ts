import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isAuth: boolean;
}

const initialState: InitState = {
    isAuth: false,
};

export const setIsAuthSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
});

export default setIsAuthSlice.reducer;
export const { setIsAuth } = setIsAuthSlice.actions;
