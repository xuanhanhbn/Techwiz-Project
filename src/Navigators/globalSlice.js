import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    errorMessage: '',
    test: true
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        getExample(state) {
            state.isLoading = true;
        },
        getExampleFailed(state) {
            state.isLoading = false;
        },
        getExampleSuccess(state) {
            state.isLoading = false;
        },
    },
});

export const globalActions = globalSlice.actions;

export const makeSelectGlobal = state => state.global;
export default globalSlice.reducer;