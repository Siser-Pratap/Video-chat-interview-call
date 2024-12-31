import {createServer} from "node:http";
import next from "next";
import {Server} from "socket.io";
import cors from "cors";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({dev, hostname, port});
const handler = app.getRequestHandler();

app.prepare().then(()=>{
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
        cors:{
            origin:"http://localhost:3000",
            methods:["GET", "POST"],
        }
    });

    

    io.on("connection", (socket)=>{
        const emailToSocketMapping = new Map();

        console.log("User Connected", socket.id);

        socket.on("join-room", ({emailId, roomId, username})=>{
            console.log(`${username} joined room ${roomId}`);
            emailToSocketMapping.set(emailId, socket.id);
            socket.join(roomId);
            socket.emit("joined-room", {roomId});
            socket.broadcast.to(roomId).emit("user-joined", {username});
            socket.to(roomId).emit("user-connected", username);
        })

        socket.on("user-joined", ({emailId})=>{
            console.log("user-joined", {emailId});
        })

        socket.on('message', (msg)=>{
            console.log("Message Received", msg);
            io.emit('message', msg);
        })

        socket.on("disconnect",(username)=>{
            socket.to(roomId).emit("user-disconnected", username);
            console.log("User Disconnected", socket.id);
        });

    });

    httpServer
        .once("error", (err)=>{
            console.error(err);
            process.exit(1);
        })
        .listen(port,()=>{
            console.log(`Ready on http://${hostname}:${port}`);
        });
});

