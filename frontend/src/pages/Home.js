import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import logo from "../images/Code Sync.png";
import "./Home.css";
import toast from "react-hot-toast";
const Home = (props) => {
    const [roomId,setRoomId] = useState();
    const [userName,setuserName] = useState();
    const changeRoomIdHandler = (event) => {
        setRoomId(event.target.value);
    }
    const changeUserHandler = event => {
        setuserName(event.target.value);
    }
    const createIdHandler = (event) => {
        event.preventDefault();
        setRoomId(uuidv4);
        toast.success("Created a New Room");
    };
    return (
        <div className="outer-wrap">
            <div className="wrapper">
                <div className="logobox">
                    <img src={ logo } alt="Live Coding" className="logo" />
                </div>
                <form className="room">
                    <label>
                        Paste Invitation Room ID
                    </label>
                    <input type="text" placeholder="ROOM ID" onChange={changeRoomIdHandler} value={roomId}>
        
                    </input>
                    <input type="text" placeholder="USERNAME" onChange={changeUserHandler} value={userName}>

                    </input>
                    <button>Join</button>
                </form>
                <div className="new-room-invite">
                    if you don't have an room invite &nbsp;<a onClick={createIdHandler} href="">create Room</a>
                </div>
            </div>
        </div>
    )
}
export default Home;