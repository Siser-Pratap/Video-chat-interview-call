import { NextResponse } from "next/server";


export function middleware(request) {
  
  const path = request.nextUrl.pathname;
  const isPublicPath = path ==="/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  
  // if (isPublicPath && token){
  //     console.log('Redirecting to / because authenticated user is on public path.');
  //     return NextResponse.redirect(new URL("/", request.nextUrl));
  // }

  // if (!isPublicPath && !token){
  //     console.log('Redirecting to /login because unauthenticated user is on a protected path.');
  //     return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
  // return NextResponse.next();

}



  export const config = {
    matcher: [
      "/",
      "/login",
      "/logout",
      "/traits",
      "/signup",
      "/profile",
      "/meeting/:id",
      "/dashboard",
    ],
  };