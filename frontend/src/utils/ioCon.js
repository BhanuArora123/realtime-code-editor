import { io } from "socket.io-client";
const ioObj = {
    getIoCon: undefined,
    createCon: function () {
        return new Promise((resolve, reject) => {
            const socket = io("http://localhost:8080/");
            socket.on("connect", function(){
                this.getIoCon = socket;
                console.log("connected");
                resolve(socket);
            })
            // return socket;
        })
    }
}
export default ioObj;