import react, {useRef, useEffect} from 'react';


const VideoCall = ({roomId}) => {
    const localVideoRef= useRef(null)

    useEffect(()=>{
        const startVideo = async()=>{
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            localVideoRef.current.srcObject = stream;
        };
        startVideo();
    }, []);

  return (
    <div>
        <video ref={localVideoRef} autoPlay muted/>
    </div>

  )}

export default VideoCall;
