import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'dark',
    userId: '63f087a826609548e044fa45',
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;