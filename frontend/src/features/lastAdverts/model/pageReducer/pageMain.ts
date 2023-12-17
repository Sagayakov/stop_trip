import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    pageMain: number;
}

const initialState: InitState = {
    pageMain: 1,
};

export const setPageMainSlice = createSlice({
    name: 'pageMain',
    initialState,
    reducers: {
        setPageMain: (state, action: PayloadAction<number>) => {
            state.pageMain = action.payload;
        },
    },
});

export default setPageMainSlice.reducer;
export const { setPageMain } = setPageMainSlice.actions;
