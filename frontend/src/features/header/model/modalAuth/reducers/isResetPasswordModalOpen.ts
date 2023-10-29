import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isResetPasswordModalOpen: boolean;
}

const initialState: InitState = {
    isResetPasswordModalOpen: false,
};

export const setIsResetPasswordModalOpenSlice = createSlice({
    name: 'isResetPasswordModalOpen',
    initialState,
    reducers: {
        setIsResetPasswordModalOpen: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isResetPasswordModalOpen = action.payload;
        },
    },
});

export default setIsResetPasswordModalOpenSlice.reducer;
export const { setIsResetPasswordModalOpen } =
    setIsResetPasswordModalOpenSlice.actions;
