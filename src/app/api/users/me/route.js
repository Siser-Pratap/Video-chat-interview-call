import jwt from "jsonwebtoken";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";

export async function GET(req){
   
    try {
        const token = await req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        const user = await User.findOne({_id:id}).select("-password");

        return NextResponse.json({message:"User Found", data:user});

    } catch (error) {
        return NextResponse.json({message:"Error decoding token",error:error.message});
    }
    
}