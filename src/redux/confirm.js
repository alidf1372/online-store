import {createSlice} from "@reduxjs/toolkit";

const confirm = createSlice({
    name: "confirm",
    initialState: {
        showConfirmContent: false,
        confirmOK: {
            state : false,
            productId : 0
        }
    },
    reducers : {
        showConfirmAction : (state,action) => {
            state.showConfirmContent = action.payload;
        },
        confirmOKAction : (state, action) => {
            state.confirmOK = action.payload;
        }
    }
});

export default confirm.reducer;
export const { showConfirmAction, confirmOKAction } = confirm.actions;