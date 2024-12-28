"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";



export default function Home() {

  


  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-[100px] gap-[10px] justify-center items-center h-full w-full">
        <h1>
          username :
        </h1>
        <h2>
          email:
        </h2>
        <h3>
          password:
        </h3>
      </div>
      <Logout />
    </>
  );
}
