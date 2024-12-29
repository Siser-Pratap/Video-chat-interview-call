"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { useState } from "react";
import axios from "axios";
import { userAgent } from "next/server";
import Meeting from "./components/Meeting";
import VideoCall from "./components/VideoCall";




export default function Home() {

  const [data, setdata] = useState({email:"",username:""});

  const handleInformation = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.get("/api/users/me");
      setdata({...data, email:res.data.data.email, username:res.data.data.username});
    } catch (error) {
      console.log(error.message);
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
    </>
  );
}
