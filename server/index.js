//! just socket.io version
const express = require("express");
const http = require("http");
const cors = require("cors");
const socket = require("socket.io");
const gameListCtrl = require("./controller/gameListCtrl");
const socketCtrl = require("./controller/socketCtrl");

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

app.get("/list", (req, res) => gameListCtrl.getGameList(req, res, users));

io.on("connection", (socket) => socketCtrl.socketCtrl(socket, users));

server.listen(8000, () => console.log("server is running on port 8000"));
