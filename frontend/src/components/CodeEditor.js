import CodeMirror from "codemirror";
import { useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/css-hint.js";
const CodeEditor = () => {
    let i = 0;
    useEffect(() => {
        async function init(){
            let editor = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"),{
                mode:{name : "javascript",json:true,globalVars:true},
                theme : "dracula",
                lineNumbers:true,
                autoCloseTags:true,
                autoCloseBrackets:true
            });
        }
        if(!i){
            init();
            i++;
        }
    },[]);
    return (
        <textarea id="realtimeEditor"></textarea>
    )
}
export default CodeEditor;