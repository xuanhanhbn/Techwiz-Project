import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    errorMessage: '',
    test: true
}

const layoutSlice = createSlice({
    name: 'layout',
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

export const layoutActions = layoutSlice.actions;

export const makeSelectLayout = state => state.layout;

export default layoutSlice.reducer;