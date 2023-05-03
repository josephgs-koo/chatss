import React, { createContext, useRef, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useSetRecoilState, useRecoilState } from "recoil";
import { msgListState } from "../../store/msgAtom";
import { GameStateFamily } from "../../store/GameData";

import Loading from "../../pages/ui/parts/Loading";
import useGamePopUp from "../hooks/useGamePopUp";

interface IPeerContext {
    socket: Socket | undefined;
    handleSendMsg: (type: "msg" | "game", data: any) => void;
}

export const PeerContext = createContext<IPeerContext | null>(null);

const PeerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket>();
    const peerRef = useRef<RTCPeerConnection>();
    const dataChannel = useRef<RTCDataChannel>();
    const [isConnect, setIsConnect] = useState<boolean>(false);
    const [chess, setChess] = useRecoilState(GameStateFamily("gameData"));
    const setmsgList = useSetRecoilState(msgListState);
    const setIsHost = useSetRecoilState(GameStateFamily("host"));
    const setPopUp = useGamePopUp();
    const { roomID } = useParams();
    const navigate = useNavigate();

    const createPeer = () => {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: ["stun:stun.l.google.com:19302"],
                },
            ],
        });
        peer.onicecandidate = handleIce;
        peer.oniceconnectionstatechange = connectionHandler;
        return peer;
    };

    const handleIce = (ev: RTCPeerConnectionIceEvent) => {
        if (ev.candidate) {
            socketRef.current?.emit("ice", { roomID, candidate: ev.candidate });
        }
    };

    const connectionHandler = (ev: Event) => {
        switch (peerRef.current?.iceConnectionState) {
            case "connected":
                setIsConnect(true);
                break;
            case "closed":
                setPopUp("leave");
                break;
            case "disconnected":
                setPopUp("leave");
                break;
            case "failed":
                setPopUp("leave");
                break;
            default:
                break;
        }
    };

    const handleChannelMsg = (ev: MessageEvent<string>) => {
        const { type, data } = JSON.parse(ev.data);
        switch (type) {
            case "msg":
                setmsgList((prev) => [{ me: false, msg: data }, ...prev]);
                break;
            case "game":
                const gameCopy = { ...chess };
                gameCopy.move({
                    from: data.sourceSquare,
                    to: data.targetSquare,
                    promotion: "q",
                });
                if (gameCopy.game_over()) setPopUp("lose");
                setChess(gameCopy);
                break;
            default:
                console.error("not valid type");
                break;
        }
    };

    const handleJoined = async (host: boolean) => {
        setIsHost(host);
        peerRef.current = createPeer();
        if (host) {
            dataChannel.current = peerRef.current.createDataChannel("sendChannel");
            dataChannel.current.onmessage = handleChannelMsg;
            const offer = await peerRef.current?.createOffer();
            peerRef.current?.setLocalDescription(offer);

            socketRef.current?.emit("offer", { roomID, offer });
        }
    };

    const handleCreateAnswer = async (offer: RTCSessionDescriptionInit) => {
        if (!peerRef.current) return;
        peerRef.current.ondatachannel = (ev) => {
            dataChannel.current = ev.channel;
            dataChannel.current.onmessage = handleChannelMsg;
        };
        peerRef.current.setRemoteDescription(offer);
        const answer: RTCSessionDescriptionInit = await peerRef.current.createAnswer();
        peerRef.current.setLocalDescription(answer);

        socketRef.current?.emit("answer", { roomID, answer });
    };

    const handleAnswerRecieved = (answer: RTCSessionDescriptionInit) => {
        peerRef.current?.setRemoteDescription(answer);
    };

    const handleIceRecieved = (ice: RTCIceCandidateInit) => {
        if (!peerRef.current) return;
        peerRef.current.addIceCandidate(ice);
    };

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_WS_HOST);
        socketRef.current.emit("join room", roomID);

        socketRef.current.on("joined", handleJoined);

        socketRef.current.on("other joined", handleJoined);

        socketRef.current.on("offer", handleCreateAnswer);

        socketRef.current.on("answer", handleAnswerRecieved);

        socketRef.current.on("ice", handleIceRecieved);

        socketRef.current.on("room full", () => {
            alert("room is full");
            navigate(-1);
        });

        return () => {
            socketRef.current?.emit("leave", roomID);
            socketRef.current?.disconnect();
            peerRef.current?.close();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendMsg = (type: "msg" | "game", data?: any) => {
        const sendData = { type, data };
        dataChannel.current?.send(JSON.stringify(sendData));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const socket = useMemo(() => ({ socket: socketRef.current, handleSendMsg }), [socketRef]);

    return <PeerContext.Provider value={socket}>{isConnect ? children : <Loading />}</PeerContext.Provider>;
};

export default PeerContextProvider;
