import React, { useRef, useEffect, useState } from 'react';

const VideoCall = ({ roomId }) => {
  const localVideoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamRef = useRef(null); // Keep track of the media stream

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        streamRef.current = stream; // Save the stream reference
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    const stopVideo = () => {
      if (streamRef.current) {
        // Stop all tracks (video and audio)
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null; // Clear the stream reference
        localVideoRef.current.srcObject = null; // Remove the stream from the video element
      }
    };

    if (isStreaming) {
      startVideo();
    } else {
      stopVideo();
    }

    return () => stopVideo(); // Cleanup when the component unmounts
  }, [isStreaming]);

  const toggleStreaming = () => {
    setIsStreaming((prev) => !prev); // Toggle the streaming state
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted style={{ width: "100%", height: "auto" }} />
      <button onClick={toggleStreaming}>{isStreaming ? "Stop" : "Start"}</button>
    </div>
  );
};

export default VideoCall;
