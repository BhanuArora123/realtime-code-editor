const express = require("express");
const router = require("./routes/code");
const app = express();
const seq = require("./utils/db");
const {createIoCon} = require("./utils/iocon");
const cors = require("cors");
const {clients} = require("./utils/clients");
const { CONNECT, CONNECT_ERROR, JOIN, SYNC_CODE, DISCONNECT, LEAVE, LEFT_ROOM, DISPLAY_CODE, JOINED } = require("./utils/actions");
app.use(cors({
  origin:"*"
}))
app.use(express.json());

app.use(router);

(async function dbauth(){
    try {
        await seq.authenticate();
        seq.sync();
        console.log('Connection has been established successfully.');
        const server = app.listen(8080);
        const io = await createIoCon(server);
        // server.listen(8080);
        io.on(CONNECT,(socket) => {
          console.log("socket connected!");
          socket.on(JOIN,(roomId,socketId,name) => {
            console.log(roomId);
            socket.join(roomId);
            console.log(io.sockets.adapter.rooms);
            if(!clients[roomId]){
              clients[roomId]={};
            }
            clients[roomId][socketId] = name;
            io.to(roomId).emit(JOINED,clients[roomId],name,socketId);
          });
          socket.on(SYNC_CODE,({roomId,code}) => {
            socket.broadcast.to(roomId).emit(DISPLAY_CODE,{
              code,
              roomId
            })
          })
          socket.on(DISCONNECT,(roomId,socketId) => {
            socket.leave(roomId);
            if(clients[roomId]){
              clients[roomId][socketId] = undefined;
            }
          })
          socket.on(LEAVE,(roomId,name,socketId) => {
            socket.leave(roomId);
            if(clients[roomId]){
              clients[roomId][socketId] = undefined;
            }
            socket.to(roomId).emit(LEFT_ROOM,{
              name,
              clients : clients[roomId]
            })
          })
        });
        io.on(CONNECT_ERROR,(err) => {
          console.log(err);
        })
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();