import {configureStore} from "@reduxjs/toolkit";
import codeSlice from "./code";
import themeSlice from "./theme";

const store = configureStore({
    reducer:{
        theme : themeSlice.reducer,
        code:codeSlice.reducer
    }
});
export default store;