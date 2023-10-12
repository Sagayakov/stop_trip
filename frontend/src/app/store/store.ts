import { configureStore } from '@reduxjs/toolkit'
import { toggleModalSlice } from '../../features/header/model/modalAuth/reducers/toggleModal'

export const store = configureStore({
    reducer: {
        toggleModalEnter: toggleModalSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
