"use client";
import { NextResponse } from 'next/server';
import React, { useState } from 'react';
import axios from 'axios';

const Page = () => {

  const [user, setuser] = useState({username: '', email: '', password: ''});

  const handleusernameChange = (e) => {
    setuser({...user, username:e.target.value});
  }

  const handleemailChange = (e) => {
    setuser({...user, email:e.target.value});
  }
 
  const handlepasswordChange = (e) => {
    setuser({...user, password:e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data);
      if (res){
        console.log("user signed up", user);
      }
    } catch (error) {
      console.log("Error encountered",error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>username:</label>
        <input
          type="text"
          value={user.username}
          onChange={handleusernameChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={handleemailChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={user.password}
          onChange={handlepasswordChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Page;
