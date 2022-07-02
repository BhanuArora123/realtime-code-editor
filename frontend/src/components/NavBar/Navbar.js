import { useDispatch, useSelector } from "react-redux";
import { ShortForm, useShortForm } from "../../utils/ShortForm";
import { codeActions, runCode } from "../../store/code";
import { themeactions } from "../../store/theme";
import "../main.css";
const NavBar = (props) => {
    const dispatch = useDispatch();
    const selectChangeHandler = (event) => {
        let id = event.target.getAttribute("id");
        console.log(id);
        if(id === "lang"){
            dispatch(themeactions.changeLanguage({language : event.target.value}));
            console.log(event.target.selectedOptions[0].innerText);
            dispatch(codeActions.updateLanguage(ShortForm(event.target.selectedOptions[0].innerText)))
        }else{
            dispatch(themeactions.changeTheme({theme : event.target.value}))
        }
    }
    const {codeId , code , language , currentUserName , codeInput} = useSelector((state) => state.code);
    const runCodeHandler = () => {
        dispatch(runCode(codeId , code , language , currentUserName,codeInput));
    }
    return (
        <div className="w-full m-0 p-0 flex justify-around h-16 border-b-2 border-b-themeColor2 items-center bg-themeColor">
            <h2 className="w-nav block box-border p-48 text-2xl text-white">Code Sync</h2>
            <select id="lang" className="w-32 h-7 rounded-sm outline-none border-none" defaultValue="Javascript" onChange={selectChangeHandler}>
                <option value="javascript">Javascript</option>
                <option value="text/x-csrc">C++</option>
                <option value="text/x-java">Java</option>
                <option value="python">Python</option>
                <option value="text/x-csrc">C</option>
            </select>
            <button className="w-20 h-7 rounded-sm outline-none border-none bg-green-200 text-themeColor2 font-bold" onClick={runCodeHandler}>Run</button>
            <select id="theme" className="w-32 h-7 rounded-sm outline-none border-none" defaultValue="Material" onChange={selectChangeHandler}>
            <option value="material">Material</option>
            <option value="monokai">Monokai</option>
            <option value="blackboard">BlackBoard</option>
            <option value="dracula">Dracula</option>
            <option value="cobalt">Cobalt</option>
            <option value="eclipse">Eclipse</option>
            <option value="lucario">Lucario</option>
            <option value="tomorrow-night-bright">Tomorrow Night Bright</option>
            <option value="tomorrow-night-eighties">Tomorrow Night Eighties</option>
            <option value="ambiance">Ambiance</option>
            <option value="3024-day">DayLight</option>
            </select>
        </div>
    )
}
export default NavBar;