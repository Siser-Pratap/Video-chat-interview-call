import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef, useEffect } from 'react';


// Reusable Button Component
const Button = ({ children, className, ...props }) => (
  <a className={`p-2 flex items-center text-sm rounded-lg hover:bg-gray-100 focus:outline-none ${className}`} {...props}>
    {children}
  </a>
);

// Reusable Dropdown Component
const Dropdown = ({ title, children }) => (
  <div className="hs-dropdown [--strategy:static] md:[--strategy:absolute] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false]">
    <button
      type="button"
      className="hs-dropdown-toggle w-full p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label="Mega Menu"
    >
      {title}
      <svg className="hs-dropdown-open:-rotate-180 duration-300 shrink-0 size-4 ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <div className="hs-dropdown-menu transition-opacity duration-150 opacity-0 relative w-full min-w-60 hidden z-10 top-full">
      {children}
    </div>
  </div>
);

// Reusable NavLink Component
const NavLink = ({ href, children, isActive }) => (
  <Button
    href={href}
    className={`text-gray-800 ${isActive ? 'bg-gray-100' : ''} dark:text-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-700`}
    aria-current={isActive ? 'page' : undefined}
  >
    {children}
  </Button>
);

// Main Navbar Component
// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
//         <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center gap-x-1">
//             <a className="flex-none font-semibold text-xl text-black dark:text-white" href="#" aria-label="Brand">Brand</a>
//             <button type="button" className="hs-collapse-toggle md:hidden relative flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" aria-expanded="false" aria-controls="hs-header-base">
//               <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="3" x2="21" y1="6" y2="6" />
//                 <line x1="3" x2="21" y1="12" y2="12" />
//                 <line x1="3" x2="21" y1="18" y2="18" />
//               </svg>
//               <svg className="hs-collapse-open:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M18 6 6 18" />
//                 <path d="m6 6 12 12" />
//               </svg>
//               <span className="sr-only">Toggle navigation</span>
//             </button>
//           </div>
//           <div id="hs-header-base" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md :block" aria-labelledby="hs-header-base-collapse">
//             <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
//               <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
//                 <div className="grow">
//                   <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
//                     <NavLink href="#" isActive>
//                       <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
//                         <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//                       </svg>
//                       Landing
//                     </NavLink>
//                     <Dropdown title="Resources">
//                       <div className="py-1 md:p-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <NavLink href="#">
//                           <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//                             <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//                           </svg>
//                           Support Docs
//                         </NavLink>
//                         <NavLink href="#">
//                           <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <rect width="7" height="7" x="14" y="3" rx="1" />
//                             <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
//                           </svg>
//                           Integrations
//                         </NavLink>
//                         <NavLink href="#">
//                           <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="m7 11 2-2-2-2" />
//                             <path d="M11 13h4" />
//                             <rect width="18" height="18" x
//                             ="3" y="3" rx="2" ry="2" />
//                           </svg>
//                           API Reference
//                         </NavLink>
//                       </div>
//                     </Dropdown>

//                     <NavLink href="#">
//                       <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="12" cy="12" r="10" />
//                         <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
//                         <path d="M12 17h.01" />
//                       </svg>
//                       Help Center
//                     </NavLink>

//                     <NavLink href="#">
//                       <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="12" cy="12" r="4" />
//                         <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
//                       </svg>
//                       Developer Hub
//                     </NavLink>

//                     <NavLink href="#">
//                       <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//                         <circle cx="9" cy="7" r="4" />
//                         <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//                         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//                       </svg>
//                       Community Forum
//                     </NavLink>
//                   </div>
//                 </div>

//                 <div className="my-2 md:my-0 md:mx-2">
//                   <div className="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300 dark:bg-neutral-700"></div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-x-1.5">
//                   <Button className="border border-gray-200 bg-white text-gray-800 shadow-sm">Sign in</Button>
//                   <Button className="bg-blue-600 text-white">Get started</Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };


const Navbar = () => {
  const [medium, setmedium] = useState(false);

  const tl = useRef();
  const back = useRef();
  const nav = useRef();
  const navItems = useRef();
  const hover = useRef();
  const image = useRef();
  useEffect(() => {
    const navValues = document.querySelector(".navValues");
  
    const animationContext = gsap.context(() => {
      // Initial animations for image and navValues
      gsap.from(image.current, {
        opacity: 0,
        x: "-80px",
        rotate: 0,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
  
      gsap.set(".navValues", { y: "-100vh", opacity: 0 });
      gsap.set(back.current, { x: "-100vw" });
  
      gsap.to(image.current, {
        opacity: 1,
        x: "0",
        delay: 0.1,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.5,
      });
  
      // Timeline for medium state changes
      tl.current = gsap.timeline({ paused: true })
        .to(back.current, {
          zIndex: 2,
          x: 0,
          duration: 0.4,
          ease: "expo.inOut",
        })
        .to(".navValues", {
          y: 0,
          duration: 0.3,
          opacity: 1,
          stagger: 0.1,
          ease: "expo.inOut",
        });
    }, [image, medium]); // Add relevant refs to dependency array
  
    // Toggle play/reverse based on medium state
    medium ? tl.current.play() : tl.current.reverse();
  
    // Cleanup GSAP context on component unmount
    return () => animationContext.revert();
  }, [medium]);

  return (
    <div className="relative nav bg-black">
            <div className="absolute z-[0] w-full">
              <nav ref={nav} className="bg-inherit ml-0 sm:ml-20 flex justify-center items-center">
                <div className="max-w-screen-xl flex no-wrap w-full items-center justify-between p-6">
                  <a href="/" className="flex items-center space-x-1 md:space-x-14 rtl:space-x-reverse">
                    <img ref={image} src="/logo.png" className="h-12 w-auto logo" alt="logo" />
                    <span className="self-center name text-[#fff] text-[1em] sm:text-[1.5rem] font-[400] transform hover:translate-y-[-3px] transition duration-300 ease-in-out whitespace-nowrap hover:text-transparent hover:bg-secondary bg-clip-text">
                      VisionWeave
                    </span>
                  </a>
                  <div className="flex justify-center items-center gap-[4px] md:gap-[8px] md:order-2 ml-0 sm:ml-20">
                    <a href="/create-post">
                      <button type="button" className="font-medium justify-end rounded-[20px] text-black text-sm sm:text-md px-4 py-2 text-center bg-secondary hover:bg-tertiary font-[Ancient] text-[1.3rem]">
                        Create
                      </button>
                    </a>
                    <div className="cursor-pointer">
                      <a href="https://github.com/Siser-Pratap" alt="github.com/Siser-Pratap">
                        <svg className="text-white w-5 ml-1 h-5" xmlns="http://www.w3.org/2000/svg" fill="white" x="0px" y="0px" viewBox="0 0 50 50">
                          <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25C2,35.164,8.63,43.804,17.791,46.836z"></path>
                        </svg>
                      </a>
                    </div>
                    <button onClick={() => setmedium(!medium)} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center mr-[0px] p-2 w-10 h-10 justify-end text-sm rounded-lg md:hidden" aria-controls="navbar-cta" aria-expanded="false">
                      {medium ? (
                        <svg className="navButtons w-5 h-5 text-white font-bold" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="white" stroke="white" strokeWidth="4" viewBox="0 0 64 64">
                          <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 17 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                      <li>
                        <a href="#about" className="block font-[Ancient] text-[1.3rem] font-[100] transform hover:translate-y-[-3px] transition duration-300 ease-in-out text-white py-2 px-3 md:p-0 hover:text-transparent hover:bg-secondary bg-clip-text">
                          About
                        </a>
                      </li>
                      <li>
                        <a href="#pricing" className="block font-[Ancient] text-[1.3rem] font-[100] transform hover:translate-y-[-3px] transition duration-300 ease-in-out text-white py-2 px-3 md:p-0 hover:text-transparent hover:bg-secondary bg-clip-text">
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a href="#contact" className="block font-[Ancient] text-[1.3rem] font-[100] transform hover:translate-y-[-3px] transition duration-300 ease-in-out text-white py-2 px-3 md:p-0 hover:text-transparent hover:bg-secondary bg-clip-text">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div ref={back} className="h-[100vh] back absolute z-[-1] w-full min-w-[254px]">
              <div className="w-auto robot h-full bg-robot-pattern bg-cover bg-no-repeat bg-center backdrop-blur-md">
                <div onClick={() => setmedium(!medium)} className="flex justify-end p-5 cursor-pointer transform hover:scale-5 transition hover:-translate-y-1 duration-200 ease-in-out">
                  <svg className="navButtons w-5 h-5 text-white font-bold" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="white" stroke="white" strokeWidth="4" viewBox="0 0 64 64">
                    <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
                  </svg>
                </div>
                <div className="h-full w-full flex flex-col justify-center items-baseline left-[50px] ml-[20vw]">
                  <ul className="flex flex-col navVal gap-[20px] mb-[30px]">
                    <li className="p-2px transform hover:scale-125 transition hover:-translate-y-1 duration-200 ease-in-out">
                      <a href="/" className="block navValues font-[Ancient] text-[1.3rem] transform hover:translate-[20px] transition duration-300 ease-in-out text-white py-2 px-3 md:p-0 hover:text-transparent hover:bg-secondary bg-clip-text" aria-current="page">
                        Home
                      </a>
                    </li>
                    <li className="p-2px transform hover:scale-125 transition hover:-translate-y-1 duration-200 ease-in-out">
                      <a href="/create-post" className="block navValues font-[Ancient] text-[1.3rem] font-[100] transform hover:translate-x-[-3px] transition duration-300 ease-in-out text-white py-2 px-3 md:p-0 hover:text-transparent hover:bg-secondary bg-clip-text">
                        Create
                      </a>
                    </li>
                    <li className="p-2px transform hover:scale-125 transition hover:-translate-y-1 duration-200 ease-in-out">
                      <a href="#pricing" className="block navValues font-[Ancient] text-[1.3rem] font-[100] transform hover:translate-x-[-3px] transition duration-300 ease-in-out text-white py-2 px-3 md:p-0 hover:text-transparent hover:bg-secondary bg-clip-text">
                        Pricing
                      </a>
                    </li>
                    <li className="p-2px transform hover:scale-125 transition hover:-translate-y-1 duration-200 ease-in-out">
                      <a href="#contact" className="block navValues font-[Ancient] text-[1.3rem] font-[100] transform hover:translate-x-[-3px] transition duration-300 ease-in-out text-white py-2 px-3 md:p-0 hover:text-transparent hover:bg-secondary bg-clip-text">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
  )


}

export default Navbar;