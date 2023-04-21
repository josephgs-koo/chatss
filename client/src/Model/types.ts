export interface IMessageInterface {
    me: boolean;
    msg: string;
}

export interface IUserConnectionInfo {
    roomID: string;
}

export interface IGamePopUp {
    display: boolean;
    msg: string;
}

export interface IGameData {
    isOver: boolean;
    gameData: any;
    host: boolean;
    popUp: IGamePopUp;
}
