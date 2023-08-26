import { createSlice } from "@reduxjs/toolkit";

const mode = createSlice({
    name: "mode",
    initialState: {
        mode: 'light'
    },
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            console.log(state.mode)
        }
    }
});

export default mode.reducer;
export const { toggleMode } = mode.actions;