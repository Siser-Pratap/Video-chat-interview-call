export const createPeerConnection = (stream, socket, roomId, userId) => {
    const peerConnections = {};
  
    socket.on("user-connected", (remoteUserId) => {
      const peerConnection = new RTCPeerConnection();
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
  
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("send-candidate", {
            candidate: event.candidate,
            to: remoteUserId,
          });
        }
      };
  
      peerConnection.ontrack = (event) => {
        const remoteStream = new MediaStream();
        remoteStream.addTrack(event.track);
        document.getElementById("remote-video").srcObject = remoteStream;
      };
  
      peerConnections[remoteUserId] = peerConnection;
    });
  
    return peerConnections;
  };
  