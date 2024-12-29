import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
    },
    host:{
        type:String, 
        required:true,
    },
    participants:[{type:String}],
    createdAt:{
        type:Date,
        default:Date.now
    },
});

const Meeting = mongoose.models.meetings || mongoose('meeting', meetingSchema);

export default Meeting;