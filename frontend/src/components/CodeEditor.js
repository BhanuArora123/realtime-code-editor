import CodeMirror from "codemirror";
import { useEffect, useState } from "react";
// import "antd/lib/button/style/index.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/css-hint.js";
//languages
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/php/php";
// themes 
import "codemirror/theme/blackboard.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/3024-day.css";
//
import ioObj from "../utils/ioCon";
import { DISPLAY_CODE, JOIN, JOINED, LEFT_ROOM, SYNC_CODE } from "../utils/actions";
import { useParams } from "react-router-dom";
import {Alert} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { codeActions } from "../store/code";
const CodeEditor = (props) => {
    let {roomId} = useParams();
    console.log(roomId);
    const dispatch = useDispatch();
    dispatch(codeActions.updateCodeState({
        codeId:roomId
    }));
    // const [left,setLeft] = useState(false);
    const [leftBy , setLeftBy] = useState();
    const themeData = useSelector((state) => state.theme);
    console.log(themeData);
    const editorRef = useRef();
    if(editorRef.current){
        editorRef.current.setOption("theme",themeData.theme);
        editorRef.current.setOption("mode",{ name: themeData.language, json: true, globalVars: true });
    }
    useEffect(() => {
        async function init() {
            let editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"), {
                mode: { name: themeData.language, json: true, globalVars: true },
                theme: themeData.theme,
                lineNumbers: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
            });
            editor.setOption("theme",themeData.theme);
            editor.setOption("mode",{ name: themeData.language, json: true, globalVars: true })
            editorRef.current = editor;
            editor.setSize(null,550)
            let socket = ioObj.getIoCon;
            socket.off(DISPLAY_CODE);
            console.log(socket.id);
            socket.emit(JOIN,roomId,socket.id,props.client);
            socket.on(DISPLAY_CODE, (data) => {
                // display data
                console.log(data);
                editor.setValue(data.code);
            })
            socket.off(JOINED);
            socket.on(JOINED,(clients,socketId,name) => {
                console.log(Object.values(clients));
                props.setClients(Object.values(clients));
                console.log(name);
                // display the toast regarding the join room Event
                console.log(socketId,name);
            })
            socket.off(LEFT_ROOM);
            socket.on(LEFT_ROOM,({name,clients}) => {
                props.setClients(Object.values(clients))
                setLeftBy(name);
                setTimeout(() => {
                    setLeftBy(undefined);
                },4000);
            })
            editor.on("change",(instance,changes) => {
                console.log(changes);
                if(changes.origin !== "setValue"){
                    socket.emit(SYNC_CODE,{
                        roomId,
                        code : editor.getValue()
                    })
                }   
                dispatch(codeActions.updateCodeState({
                    code:instance.getValue()
                }))
            });
        }
        init();
    }, []);
    return (
        <>
            {leftBy && <Alert message={`${leftBy} has left the room`} type="success" showIcon style={
                {"position":"absolute",
                "top":"10px",
                "left":"50%",
                "zIndex":"100",
                "color":"green",
                "backgroundColor":"lightgreen",
                "width":"230px",
                "height":"40px",
                "display":"flex",
                "justifyContent":"space-evenly",
                "alignItems":"center",
                "borderRadius":"5px"
                }} />}
            <textarea id="realtimeEditor"></textarea>
        </>
    )
}
export default CodeEditor;