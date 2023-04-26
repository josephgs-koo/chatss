//! web-rtc version
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { getGameList } from "./controller/gameListCtrl.js";
import socketCtrl from "./controller/socketCtrl.js";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const users = {};

const app = express();
app.use(cors());

//! https 변경
const server = http.createServer(app);
//* socket.io cors설정
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
app.get("/list", (req, res) => getGameList(req, res, users));

io.on("connection", (socket) => socketCtrl(socket, users));

server.listen(8000, () => console.log("server is running on port 8000"));
