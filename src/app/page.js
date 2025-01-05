"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import axios from "axios";
import { userAgent } from "next/server";
import Meeting from "./components/Meeting";
import VideoCall from "./components/VideoCall";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import JoinMeeting from "./components/JoinMeeting";
import Message from "./components/message";
import Chat from "./components/Chat";




export default function Home() {

  const [data, setdata] = useState({email:"",username:""});
  const [isConnected, setisConnected] = useState(false);
  const [transport, setTransport] = useState(null);
  const [click, setclick] = useState(false);
  const [message, setmessage] = useState("");

  useEffect(() => {
    if(socket.connected){
      onConnect();
    }

    function onConnect() {
      setisConnected(true);
      setTransport(socket.io.engine.transport.name);
    
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    } 

    function onDisconnect(){
      setisConnected(false);
      setTransport(null);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () =>{
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  }, []);

  const handleInformation = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.get("/api/users/me");
      setdata({...data, email:res.data.data.email, username:res.data.data.username});
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDisconnect=()=>{
    setclick(!click);
    if(click){
      socket.disconnect();
    }
    else{
      socket.connect();
    }
  }

  const handleChange = (e) => {
    setmessage(e.target.value);
  }

  const submit = async(e) => {
    e.preventDefault();
    socket.emit('message', message);
    setmessage("");
  }

  


  return (
    <>
      
      {/* <div className="flex flex-col mt-[100px] gap-[10px] justify-center items-center h-full w-full">
        <h1>
          Username : {data.username}
        </h1>
        <h2>
          email: {data.email}
        </h2>
        <button onClick={handleInformation}>Get User details</button>
      </div> */}
      {/* <Logout />
      <Meeting />
      <div>
        <VideoCall />
      </div>
      <div>
        <h1>Socket functionality</h1>
        <p>Status: { isConnected ? "connected" : "disconnected" }</p>
        <p>Transport: { transport }</p>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
      <div>
        <h1>Chat</h1>
        <input type="text" onChange={handleChange} value={message} placeholder="Enter your message" />
        <button onClick={submit}>Send</button>
      </div>
      <div>
        <JoinMeeting />
      </div>
      <div>
        <Message />
      </div>
      <div>
        <Chat />
      </div> */}
    </>
  );
}
