import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isCheckMailModalOpen: boolean;
}

const initialState: InitState = {
    isCheckMailModalOpen: false,
};

export const setIsCheckMailModalOpenSlice = createSlice({
    name: 'isCheckMailModalOpen',
    initialState,
    reducers: {
        setIsCheckMailModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isCheckMailModalOpen = action.payload;
        },
    },
});

export default setIsCheckMailModalOpenSlice.reducer;
export const { setIsCheckMailModalOpen } = setIsCheckMailModalOpenSlice.actions;
