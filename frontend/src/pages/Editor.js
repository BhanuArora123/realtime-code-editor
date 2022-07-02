import { useEffect, useRef, useState } from "react";
import logo from "../images/Code_Sync.png";
import Avatar from "react-avatar";
import "./Editor.css";
import CodeEditor from "../components/CodeEditor";
import ioObj from "../utils/ioCon";
import { DISPLAY_CODE, LEAVE } from "../utils/actions";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { codeActions } from "../store/code";
const Editor = (props) => {
    const name = localStorage.getItem("name");
    const { roomId } = useParams();
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([
        name
    ]);
    const dispatch = useDispatch();
    const codeData = useSelector(state => state.code);
    const {codeOutput, errors, codeInput} = codeData;
    console.log(codeInput);
    console.log(errors);
    const copyTextHandler = () => {
        navigator.clipboard.writeText(roomId);
    }
    const changeHandler = (event) => {
        dispatch(codeActions.updateCodeState({
            codeInput:event.target.value
        }))
    }
    const leaveRoomHandler = () => {
        const socket = ioObj.getIoCon;
        socket.emit(LEAVE, roomId, name, socket.id);
        window.location.href = "http://localhost:3000/";
    }
    useEffect(() => {
        async function socketConnect() {
            let socket = await ioObj.createCon();
            setLoading(false);
            ioObj.getIoCon = socket;
            return socket;
        }
        socketConnect();
    }, [])
    return (
        <div style={ {
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "inherit"
        } }>
            <NavBar></NavBar>
            <div className="outer-wrap1">
                <div className="aside">
                    <div className="aside-logo">
                        <img src={ logo } alt="" />
                    </div>
                    <div className="connected">
                        <h3 className="tertiary-head">
                            Connected
                        </h3>
                        <div className="clients">
                            {
                                clients.map((client) => {
                                    return (
                                        <div className="client">
                                            <Avatar size={ 50 } round="10px" name={ client } ></Avatar>
                                            <span>{ client }</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="actions">
                        <button className="btn whiteBtn" onClick={ copyTextHandler }>Copy Room ID</button>
                        <button className="btn" onClick={ leaveRoomHandler }>Leave Room</button>
                    </div>
                </div>
                <div className="editor">
                    { !loading && <CodeEditor client={ name } setClients={ setClients }></CodeEditor> }
                    { loading && <p>loading...</p> }
                </div>
                <div className="std_in_out">
                    <div className="std_output">
                        <h2>Code Output</h2>
                        <div>{codeOutput}</div>
                    </div>
                    {/* <div className="std_errors">
                        <h2>Errors</h2>
                        <div>errors goes here</div>
                    </div> */}
                    <div className="std_input">
                        <h2>Code Input</h2>
                        <textarea value={codeInput} rows="10"columns="4" placeholder="input goes here..." onChange={changeHandler}></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Editor;