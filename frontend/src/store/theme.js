import { createSlice } from "@reduxjs/toolkit"
const themeSlice = createSlice({
    name :"theme",
    initialState:{
        language : "javascript",
        theme : "dracula"
    },
    reducers:{
        changeLanguage : (state,actions) => {
            state.language = actions.payload.language;
        },
        changeTheme : (state,actions) => {
            state.theme = actions.payload.theme;
        }
    }
})
export default themeSlice;
export const themeactions = themeSlice.actions;