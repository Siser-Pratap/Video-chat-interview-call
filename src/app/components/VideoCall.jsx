import React, { useRef, useEffect, useState } from 'react';

const VideoCall = ({ roomId }) => {
  const localVideoRef = useRef(null);
  const [video, setVideo] = useState(false);
  const streamRef = useRef(null); // Keep track of the media stream

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        streamRef.current = stream; // Save the stream reference
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    const stopVideo = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks
        streamRef.current = null; // Clear the stream reference
        localVideoRef.current.srcObject = null;
      }
    };

    if (video) {
      startVideo();
    } else {
      stopVideo();
    }

    return () => stopVideo(); // Cleanup when the component unmounts
  }, [video]);

  const toggleVideo = () => {
    setVideo((prev) => !prev); // Toggle the video state
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted style={{ width: "100%", height: "auto" }} />
      <button onClick={toggleVideo}>{video ? "Stop" : "Start"}</button>
    </div>
  );
};

export default VideoCall;
