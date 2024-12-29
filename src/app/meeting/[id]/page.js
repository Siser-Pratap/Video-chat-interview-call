"use client";
import React from 'react'
import Meeting from '@/app/components/Meeting'
import { useEffect } from 'react'
import { socket } from '@/socket'


const Room = () => {

  const emailId = "one@gmail.com";
  const handleNewUserJoined = ({emailId}) => {
   socket.emit("user-joined", {emailId});
   console.log("user-joined", emailId);
  }

  useEffect(() => {
    handleNewUserJoined(emailId);
  }, [socket]);

  return (
    <div>
      <Meeting />
    </div>
  )
}

export default Room
