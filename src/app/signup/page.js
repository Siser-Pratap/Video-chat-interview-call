"use client";
import { NextResponse } from 'next/server';
import React, { useState } from 'react';

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


  const handleSubmit = async() => {
    try {
      const res = await axios.post("/api/users/signup", user);
      if (res){
        console.log("user signed up", user);
      }
    } catch (error) {
      console.log("Error encountered",error.message);
    }
  }

  return (
    <form >
      <div>
        <label>Username:</label>
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
      <button onClick={handleSubmit} type="submit">Sign Up</button>
    </form>
  );
};

export default Page;
