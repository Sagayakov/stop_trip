import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type ShowModal = true | false

interface InitState {
    toggle: ShowModal
}

const initialState: InitState = {
    toggle: false,
}

export const toggleModalSlice = createSlice({
    name: 'toggleModal',
    initialState,
    reducers: {
        toggleModalEnter: (state, action: PayloadAction<boolean>) => {
            state.toggle = action.payload
        },
    },
})

export default toggleModalSlice.reducer
export const { toggleModalEnter } = toggleModalSlice.actions
