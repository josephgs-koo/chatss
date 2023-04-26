const socketCtrl = (socket, users) => {
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
        if (users[roomID].length === 2) {
            socket.emit("joined", false);
            socket.broadcast.to(roomID).emit("other joined", true);
        }
    });

    socket.on("offer", (payload) => {
        socket.broadcast.to(payload.roomID).emit("offer", payload.offer);
    });

    socket.on("answer", (payload) => {
        socket.broadcast.to(payload.roomID).emit("answer", payload.answer);
    });

    socket.on("ice", (payload) => {
        socket.broadcast.to(payload.roomID).emit("ice", payload.candidate);
    });

    socket.on("leave", (roomID) => {
        if (users[roomID]) {
            delete users[roomID];
        }
        socket.leave(roomID);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    });
};

export default socketCtrl;
