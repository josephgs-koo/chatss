const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origin: "*",
    },
});
const cors = require("cors");

const rooms = {};

app.use(cors());

io.on("connection", (socket) => {
    socket.on("join room", (roomID) => {
        console.log(socket.id);
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find((id) => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    socket.on("offer", (payload) => {
        console.log("offer");
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
        console.log("answer");
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming) => {
        console.log("ice");
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
});

server.listen(8000, () => console.log("server is running on port 8000"));
