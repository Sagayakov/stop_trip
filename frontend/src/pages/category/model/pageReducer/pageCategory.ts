import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
    pageCategory: number;
}

const initialState: InitState = {
    pageCategory: 1,
};

export const setPageCategorySlice = createSlice({
    name: 'pageCategory',
    initialState,
    reducers: {
        setPageCategory: (state, action: PayloadAction<number>) => {
            state.pageCategory = action.payload;
        },
    },
});

export default setPageCategorySlice.reducer;
export const { setPageCategory } = setPageCategorySlice.actions;
