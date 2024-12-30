import { dbConfig } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

dbConfig();

export async function POST(req) {
    console.log("POST request received");

    try {
        const reqBody = await req.json();
        console.log("Request body parsed:", reqBody);

        const { username, email, password } = reqBody;
        console.log("Extracted data - userName:", username, "Email:", email);
        

        const user = await User.findOne({ email: email });
        if (user) {
            console.log("User already exists with email:", email);
            return NextResponse.json({ message: "User Already Registered", error: "User Exists" }, { success: false });
        }

        const salt = await bcrypt.genSalt(10);
        console.log("Generated salt for password hashing");

        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed");

        const newUser = new User({ username, email, password: hashedPassword });
        console.log("New user object created:", newUser);

        const savedUser = await newUser.save();
        console.log("New user saved to database:", savedUser);

        return NextResponse.json({ message: "New User saved", success: true, savedUser });

    } catch (error) {
        console.error("Error occurred:", error.message);
        return NextResponse.json({ message: "Error Occurred", error: error.message, success: false }, { status: 500 });
    }
}