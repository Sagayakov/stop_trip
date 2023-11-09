import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface InitState {
    [dropdown: string]: boolean;
}
const initialState: InitState = {
    typeOfService: false,
    typeOfTransport: false,
    transportationCategory: false,
    mark: false,
    model: false,
    engineType: false,
    engineСapacity: false,
    drive: false,
    yearOfProduction: false,
    transmissionType: false,
    bodyType: false,
    condition: false,
    passengerCapacity: false,
};

export const transportFormDropdownClice = createSlice({
    name: 'closeTransportFormDropdown',
    initialState,
    reducers: {
        closeDropdown: (state: InitState) => {
            Object.keys(state).forEach((dropdown) => {
                state[dropdown] = false;
            });
        },
        toggleDropdown: (state: InitState, action: PayloadAction<string>) => {
            const dropd = action.payload;
            Object.keys(state).forEach((dropdown) => {
                if (dropdown !== dropd) {
                    state[dropdown] = false;
                }
            });

            state[dropd] = !state[dropd];
        },
    },
});

export default transportFormDropdownClice.reducer;
export const { closeDropdown, toggleDropdown } =
    transportFormDropdownClice.actions;
