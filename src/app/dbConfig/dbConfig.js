import mongoose from "mongoose";

export const dbConfig = async()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Database Connection established"))
    .catch((err)=>console.log(err.message));
}