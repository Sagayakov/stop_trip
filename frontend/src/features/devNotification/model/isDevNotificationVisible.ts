import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    isDevNotificationVisible: boolean;
    height: string;
}

const initialState: InitState = {
    isDevNotificationVisible: false,
    height: '',
};

export const setIsDevNotificationVisibleSlice = createSlice({
    name: 'isDevNotificationVisible',
    initialState,
    reducers: {
        setIsDevNotificationVisible: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isDevNotificationVisible = action.payload;
        },
        setDevNotificationHeight: (state, action: PayloadAction<string>) => {
            state.height = action.payload;
        },
    },
});

export default setIsDevNotificationVisibleSlice.reducer;
export const { setIsDevNotificationVisible, setDevNotificationHeight } =
    setIsDevNotificationVisibleSlice.actions;
