import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const codeSlice = createSlice({
    name:"code",
    initialState:{
        code:"",
        codeOutput:"",
        codeInput:"",
        codeId:"",
        language:"js",
        currentUserName:"",
        errors :""
    },
    reducers:{
        updateCodeState:(state,actions) => {
            if(actions.payload.code){
                state.code = actions.payload.code;
            }
            if(actions.payload.codeId){
                state.codeId = actions.payload.codeId;
            }
            if(actions.payload.codeInput){
                state.codeInput = actions.payload.codeInput;
            }
            if(actions.payload.codeOutput){
                state.codeOutput = actions.payload.codeOutput;
            }
            if(actions.payload.errors){
                state.errors = actions.payload.errors;
            }
        },
        updateCurrUserName :(state,actions) => {
            state.currentUserName = actions.payload.currentUserName;
        },
        updateLanguage : (state,actions) => {
            state.language = actions.payload;
        }
    }
})
export default codeSlice;
export const codeActions = codeSlice.actions;
export const runCode = (roomId,code,language,userName,codeInput) => {
    return async (dispatch) => {
        let codeOutputData = await axios.post("http://localhost:8080/runCode",{
            codeId:roomId,
            code,
            language,
            userName,
            codeInput
        });
        if(codeOutputData.status !== 200 && codeOutputData.status !== 201){
            console.log(codeOutputData.data);
            // display code errors 
            dispatch(codeActions.updateCodeState({
                code,
                codeId:roomId,
                codeInput:"",
                codeOutput:"",
                language,
                errors:codeOutputData.data.errors
            }));
            return;
        }
        // display code output
        console.log(codeOutputData.data);
        dispatch(codeActions.updateCodeState({
            code,
            codeId:roomId,
            codeInput:"",
            codeOutput:codeOutputData.data.codeOutput?codeOutputData.data.codeOutput:"",
            language,
            errors:(codeOutputData.data.codeOutput)?"":codeOutputData.data.errors
        }));
    }
}