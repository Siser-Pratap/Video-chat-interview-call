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




export default function Home() {

  const [data, setdata] = useState({email:"",username:""});
  const [isConnected, setisConnected] = useState(false);
  const [transport, setTransport] = useState(null);
  const [click, setclick] = useState(false);

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

  


  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-[100px] gap-[10px] justify-center items-center h-full w-full">
        <h1>
          Username : {data.username}
        </h1>
        <h2>
          email: {data.email}
        </h2>
        <button onClick={handleInformation}>Get User details</button>
      </div>
      <Logout />
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
    </>
  );
}
