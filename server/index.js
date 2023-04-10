import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);
const port = 3001;
const handleListen = () => console.log(`Listening on http://localhost:${port}`);

httpServer.listen(port, handleListen);

wsServer.on("connection", (socket) => {
    socket.on("join", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome");
    });
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    });
});
