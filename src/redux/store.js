import { configureStore } from "@reduxjs/toolkit";
import modeReducer from './light-dark-mode';
import fetchDataSliceReducer from './fetchData';
import loginReducer from "./login";
import confirmReducer from "./confirm";

export default configureStore({
    reducer: {
        mode: modeReducer,
        fetchData: fetchDataSliceReducer,
        login: loginReducer,
        confirm: confirmReducer
    },
});
