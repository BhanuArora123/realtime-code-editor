import { useState } from "react";
import logo from "../images/Code_Sync.png";
import Avatar from "react-avatar";
import "./Editor.css";
import CodeEditor from "../components/CodeEditor";
const Editor = (props) => {
    const [clients, setClients] = useState([
        {
            name: "Bhanu Arora"
        },
        {
            name: "Nikhil Arora"
        }
    ]);
    return (
        <div className="outer-wrap">
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
                                        <Avatar size={50} round="10px" name={ client.name } ></Avatar>
                                        <span>{client.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="actions">
                    <button className="btn whiteBtn">Copy Room ID</button>
                    <button className="btn">Leave Room</button>
                </div>
            </div>
            <div className="editor">
                <CodeEditor></CodeEditor>
            </div>
        </div>
    )
}
export default Editor;