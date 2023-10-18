import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isEnter: boolean;
}

const initialState: InitState = {
    isEnter: true,
};

export const setIsEnterSlice = createSlice({
    name: 'isEnter',
    initialState,
    reducers: {
        setIsEnter: (state, action: PayloadAction<boolean>) => {
            state.isEnter = action.payload;
        },
    },
});

export default setIsEnterSlice.reducer;
export const { setIsEnter } = setIsEnterSlice.actions;
