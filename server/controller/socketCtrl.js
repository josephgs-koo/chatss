module.exports.socketCtrl = (socket, users) => {
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

    socket.on("leave", (roomID) => {
        socket.broadcast.to(roomID).emit("leave");

        if (users[roomID]) {
            delete users[roomID];
        }
        socket.leave(roomID);
    });
};
