"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Logout from '../components/Logout';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../../redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicLogo = dynamic(() => import("../components/LogoModel"), { ssr: false });

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const emailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const passwordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", user);
      console.log("user logged in", res.data);
      router.push("/");
      dispatch(loginAction(user));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <Suspense fallback={<span>Loading...</span>}>
          <DynamicLogo />
        </Suspense>
      </div>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={login}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={emailChange}
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
                onChange={passwordChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Logout />
    </>
  );
};

export default Login;