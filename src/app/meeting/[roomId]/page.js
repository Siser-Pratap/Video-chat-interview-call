"use client";
// import React from 'react'
// import Meeting from '@/app/components/Meeting'
// import { useEffect } from 'react'
// import { socket } from '@/socket'


// const Room = () => {

//   const emailId = "one@gmail.com";
//   const handleNewUserJoined = ({emailId}) => {
//    socket.emit("user-joined", {emailId});
//    console.log("user-joined", emailId);
//   }

//   useEffect(() => {
//     handleNewUserJoined(emailId);
//   }, [socket]);

//   return (
//     <div>
//       <Meeting />
//     </div>
//   )
// }

// export default Room

"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPeerConnection } from "../../../../helper/webrtc";
import { socket } from '@/socket';

const Page = ({ params }) => {
    const {roomId} = React.use(params);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        if (!roomId) return;

        const setupStream = async (roomId) => {
            try {
                const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = userStream;
                setStream(userStream);

                // Join the room
                const userId = socket.id;
                socket.emit("join-room", roomId, userId);

                // Create Peer Connection for WebRTC
                createPeerConnection(userStream, socket, roomId, userId);
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        };

        setupStream();
    }, [roomId]);

    const toggleVideo = () => {
        if (!stream) return;
        stream.getTracks().forEach((track) => (track.enabled = !track.enabled));
        setIsVideoOn((prev) => !prev);
    };

    return (
        <div>
            <h1>Room ID: {roomId}</h1>
            <div>
                <video ref={localVideoRef} autoPlay muted style={{ width: "45%" }} />
                <video id="remote-video" autoPlay style={{ width: "45%" }} />
            </div>
            <button onClick={toggleVideo}>{isVideoOn ? "Turn Off" : "Turn On"}</button>
        </div>
    );
};

export default Page;