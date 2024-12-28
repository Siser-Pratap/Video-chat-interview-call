import User from "@/app/models/userModels";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { dbConfig } from "@/app/dbConfig/dbConfig";

dbConfig();

export async function POST(req) {
    try {
        
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
        }

        const tokendata = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        const token = jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json({ message: 'User Logged in', success: true });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return response;
    } catch (error) {
       
        return NextResponse.json({ message: `Error logging in ${error.message}` }, { success: false }, { status: 500 });
    }
}
