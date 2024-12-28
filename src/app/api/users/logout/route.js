import { NextResponse } from "next/server";


export async function GET() {
    try {
        
        const response = NextResponse.json({message:"Logged out successfully",success:true,});

        response.cookies.set("token", "",{httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"});

        return response;
    } catch (error) {
        return NextResponse.json({message:"Error logging out", error:error.message});
    }
    
}