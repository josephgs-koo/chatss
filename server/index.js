//! with simple-peer version
const express = require("express");
const http = require("http");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
//* socket.io cors설정
const io = socket(server, {
    cors: {
        origin: "*",
    },
});

const users = {};

app.use(cors());

app.get("/list", (req, res) => {
    const keys = Object.keys(users);
    const response = keys.map((x) => ({
        roomID: x,
        member: users[x],
    }));
    res.json(response);
});

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
            socket.emit("joined", { target: otherUser[0], host: false });
            socket.to(otherUser).emit("joined", { target: socket.id, host: true });
        }
    });

    socket.on("msg", (payload) => {
        socket.broadcast.to(payload.roomID).emit("msg", { msg: payload.msg });
    });

    socket.on("game", (payload) => {
        socket.broadcast.to(payload.roomID).emit("game", payload.chess);
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
