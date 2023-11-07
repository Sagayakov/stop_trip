import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitState {
    typeOfService: boolean;
    typeOfTransport: boolean;
    transportationCategory: boolean;
    mark: boolean;
    model: boolean;
    engineType: boolean;
    engineСapacity: boolean;
    drive: boolean;
    yearOfProduction: boolean;
    transmissionType: boolean;
    bodyType: boolean;
    condition: boolean;
    passengerCapacity: boolean;
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

export const closeTransportFormDropdownClice = createSlice({
    name: 'closeTransportFormDropdown',
    initialState,
    reducers: {
        closeDropdown: (state) => {
            state.bodyType = false;
            state.condition = false;
            state.drive = false;
            state.engineType = false;
            state.engineСapacity = false;
            state.mark = false;
            state.model = false;
            state.passengerCapacity = false;
            state.transmissionType = false;
            state.transportationCategory = false;
            state.typeOfService = false;
            state.typeOfTransport = false;
            state.yearOfProduction = false;
        },
        closeDropdownTypeOfService: (state, action: PayloadAction<boolean>) => {
            state.typeOfService = action.payload;
        },
        closeDropdownTypeOfTransport: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.typeOfTransport = action.payload;
        },
        closeDropdownTransportationCategory: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.transportationCategory = action.payload;
        },
        closeDropdownMark: (state, action: PayloadAction<boolean>) => {
            state.mark = action.payload;
        },
        closeDropdownModel: (state, action: PayloadAction<boolean>) => {
            state.model = action.payload;
        },
        closeDropdownEngineType: (state, action: PayloadAction<boolean>) => {
            state.engineType = action.payload;
        },
        closeDropdownEngineСapacity: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.engineСapacity = action.payload;
        },
        closeDropdownDrive: (state, action: PayloadAction<boolean>) => {
            state.drive = action.payload;
        },
        closeDropdownYearOfProduction: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.yearOfProduction = action.payload;
        },
        closeDropdownTransmissionType: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.transmissionType = action.payload;
        },
        closeDropdownBodyType: (state, action: PayloadAction<boolean>) => {
            state.bodyType = action.payload;
        },
        closeDropdownCondition: (state, action: PayloadAction<boolean>) => {
            state.condition = action.payload;
        },
        closeDropdownPassengerCapacity: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.passengerCapacity = action.payload;
        },
    },
});

export default closeTransportFormDropdownClice.reducer;
export const {
    closeDropdown,
    closeDropdownBodyType,
    closeDropdownCondition,
    closeDropdownDrive,
    closeDropdownEngineType,
    closeDropdownEngineСapacity,
    closeDropdownMark,
    closeDropdownModel,
    closeDropdownPassengerCapacity,
    closeDropdownTransmissionType,
    closeDropdownTransportationCategory,
    closeDropdownTypeOfService,
    closeDropdownTypeOfTransport,
    closeDropdownYearOfProduction,
} = closeTransportFormDropdownClice.actions;
