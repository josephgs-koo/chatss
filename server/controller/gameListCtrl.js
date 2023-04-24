export const getGameList = (req, res, users) => {
    const keys = Object.keys(users);
    const response = keys.map((x) => ({
        roomID: x,
        member: users[x],
    }));
    res.json(response);
};
