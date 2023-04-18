//! with simple-peer version
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

const users = {};

io.on("connection", (socket) => {
    socket.on("join room", (roomID) => {
        if (users[roomID]) {
            if (users[roomID].length === 2) {
                socket.emit("room full");
                return;
            }

            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socket.join(roomID);

        const otherUser = users[roomID].filter((id) => id !== socket.id);

        if (users[roomID].length > 0) {
            socket.emit("joined", otherUser[0]);
            socket.to(otherUser).emit("joined", socket.id);
        }
    });

    socket.on("msg", (payload) => {
        socket.broadcast.to(payload.roomID).emit("msg", { msg: payload.msg });
    });

    socket.on("disconnect", (roomID) => {
        let room = users[roomID];
        if (room) {
            room = room.filter((id) => id !== socket.id);
            users[roomID] = room;
        }
    });
});

server.listen(8000, () => console.log("server is running on port 8000"));
