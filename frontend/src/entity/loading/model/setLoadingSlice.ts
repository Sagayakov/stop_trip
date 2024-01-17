import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    loading: boolean
}
const initialState: InitialState = {
    loading: false
}

export const setLoadingSlice = createSlice({
    name: 'setLoad',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export default setLoadingSlice.reducer
export const { setLoading } = setLoadingSlice.actions