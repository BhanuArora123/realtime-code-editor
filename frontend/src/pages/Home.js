import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";
import logo from "../images/Code Sync.png";
import "./Home.css";
import toast from "react-hot-toast";
import ioObj from "../utils/ioCon";
import { JOIN, SYNC_CODE } from "../utils/actions";
import { useDispatch } from "react-redux";
import { codeActions } from "../store/code";
const Home = (props) => {
    useEffect( () => {
        async function socketConn() {
            console.log("here");
            const socket = await ioObj.createCon();
            socket.on("connect", () => {
              console.log("connected");
            });
            socket.on("connect_error",(error) => {
              console.log(error);
            })
        }
        // socketConn();
      }, []);
    const [roomId,setRoomId] = useState();
    const [userName,setuserName] = useState();
    const dispatch = useDispatch();
    // const socket = ioObj.getIoCon;
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
    const submitHandler = (event) => {
        event.preventDefault();
        localStorage.setItem("name",userName);
        dispatch(codeActions.updateCodeState({
            currentUserName:userName
        }))
        window.location.href="http://localhost:3000/editor/"+roomId;
    }
    return (
        <div className="outer-wrap">
            <div className="wrapper">
                <div className="logobox">
                    <img src={ logo } alt="Live Coding" className="logo" />
                </div>
                <form className="room" onSubmit={submitHandler}>
                    <label>
                        Paste Invitation Room ID
                    </label>
                    <input type="text" placeholder="ROOM ID" onChange={changeRoomIdHandler} value={roomId}>
        
                    </input>
                    <input type="text" placeholder="USERNAME" onChange={changeUserHandler} value={userName}>

                    </input>
                    <button >Join</button>
                </form>
                <div className="new-room-invite">
                    if you don't have an room invite &nbsp;<a onClick={createIdHandler} href="">create Room</a>
                </div>
            </div>
        </div>
    )
}
export default Home;