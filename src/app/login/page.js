"use client";

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [user, setuser] = useState({
    email:"",
    password:"",
  });

  const emailchange = (e) => {
    setuser({...user, email:e.target.value});
  }

  const passwordchange = (e) => {
    setuser({...user, password:e.target.value});
  }

  const login = async() =>{
    try {
      const res = await axios.post("", user); 
      console.log("user registered", res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={emailchange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={passwordchange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={login}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;