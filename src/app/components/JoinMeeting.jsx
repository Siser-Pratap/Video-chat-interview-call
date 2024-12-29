"use client";
import React, { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";
import { socket } from '@/socket';

const JoinMeeting = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const router = useRouter();

    const handleRoomJoined = ({roomId}) => {
        router.push(`/meeting/${roomId}`);
    }

    useEffect(()=>{
        socket.on("joined-room", handleRoomJoined);    
    },[socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
                socket.emit("join-room", {emailId:email, roomId:roomId, username:username});
        } catch (error) {
                console.log("Error occurred while connecting ", error.message);
        }
        setEmail('');
        setUsername('');
        setRoomId('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">User Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="roomId">Room ID:</label>
                        <input
                            type="text"
                            id="roomId"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinMeeting;
