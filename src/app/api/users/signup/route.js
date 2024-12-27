import { dbConfig } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";




dbConfig();


export async function POST(req){
    
    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody;
        
        const user =await User.findOne({email:email});
        if(user){
            return NextResponse.json({message:"User Already Registered", error:"User Exists"}, {success:false});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password:hashedPassword});
        const savedUser = await newUser.save();
        
        return NextResponse.json({message:"new User saved", success:true, savedUser});

    } catch (error) {
        return NextResponse.json({message:"Error Occured", error: error.message, success:false}, {status:500});
    }
}