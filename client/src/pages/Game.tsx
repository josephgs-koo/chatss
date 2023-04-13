/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import io, { Socket } from "socket.io-client";
import Chat from "../component/chat/Chat";
import { useLocation } from "react-router-dom";
import { IUserConnectionInfo } from "../Model/types";
import PeerContext from "../Contexts/PeerContext";
import { useSetRecoilState } from "recoil";
import { msgListSelector } from "../Atom/msgAtom";

const Game: React.FC = () => {
    const roomInfo = useLocation() as { state: IUserConnectionInfo };
    const socketRef = useRef<Socket>();
    const peerRef = useRef<RTCPeerConnection>();
    const otherUser = useRef();
    const sendChannel = useRef<RTCDataChannel>();
    const setmsgList = useSetRecoilState(msgListSelector);

    useEffect(() => {
        socketRef.current = io("http://192.168.0.9:8000", {
            autoConnect: true,
        });
        socketRef.current.emit("join room", roomInfo.state.roomID);

        socketRef.current.on("other user", (userID) => {
            callUser(userID);
            otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
            otherUser.current = userID;
        });

        socketRef.current.on("offer", handleOffer);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function callUser(userID: string) {
        peerRef.current = createPeer(userID);
        sendChannel.current = peerRef.current.createDataChannel("sendChannel");
        sendChannel.current.onmessage = (e) => {
            setmsgList([{ me: false, msg: e.data }]);
        };
    }

    function createPeer(userID?: string) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        });

        peer.addEventListener("icecandidate", handleICECandidateEvent);
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID?: string) {
        peerRef.current
            ?.createOffer()
            .then((offer) => {
                return peerRef.current?.setLocalDescription(offer);
            })
            .then(() => {
                const payload = {
                    target: userID,
                    caller: socketRef.current?.id,
                    sdp: peerRef.current?.localDescription,
                };
                socketRef.current?.emit("offer", payload);
            })
            .catch((e) => console.log(e));
    }

    function handleOffer(incoming: any) {
        console.log(incoming);
        peerRef.current = createPeer();
        peerRef.current.ondatachannel = (e: RTCDataChannelEvent) => {
            sendChannel.current = e.channel;
            sendChannel.current.onmessage = (e) => {
                setmsgList([{ me: false, msg: e.data }]);
            };
        };
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current
            ?.setRemoteDescription(desc)
            .then(() => {
                return peerRef.current?.createAnswer();
            })
            .then((answer) => {
                return peerRef.current?.setLocalDescription(answer);
            })
            .then(() => {
                const payload = {
                    target: incoming.caller,
                    caller: socketRef.current?.id,
                    sdp: peerRef.current?.localDescription,
                };
                socketRef.current?.emit("answer", payload);
            })
            .catch((err) => console.log(err));
    }

    function handleAnswer(message: any) {
        console.log(message);
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current?.setRemoteDescription(desc).catch((e) => console.log(e));
    }

    function handleICECandidateEvent(e: any) {
        console.log(e);
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            };
            socketRef.current?.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming: any) {
        const candidate = new RTCIceCandidate(incoming);
        console.log(candidate);

        peerRef.current?.addIceCandidate(candidate).catch((e) => console.log(e));
    }

    const value = useMemo(() => ({ sendChannel }), [sendChannel]);

    return (
        <PeerContext.Provider value={value}>
            <section css={section}>
                <div css={board}></div>
                <Chat />
            </section>
        </PeerContext.Provider>
    );
};

export default Game;

const section = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
});

const board = css({
    width: "90vw",
    height: "90vw",
    minHeight: "90vw",
    boxShadow: "3px 3px 6px #b4b2b2, -3px -3px 6px #fbfbfb, inset -3px -3px 6px #b4b2b2, inset 3px 3px 6px #fbfbfb",
    borderRadius: "1rem",
});
