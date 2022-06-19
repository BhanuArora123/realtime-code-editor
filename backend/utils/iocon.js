const socket = require("socket.io");
let ioObj = {
    getIoCon : undefined,
    createIoCon : async function (app){
        const ioCon = await socket(app,{
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                allowedHeaders: ["Content-Type"]
            }
        });
        this.getIoCon = ioCon;
        return ioCon;
    }
}
module.exports = ioObj;