import {createServer} from "node:http";
import next from "next";
import {Server} from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({dev, hostname, port});
const handler = app.getRequestHandler();

app.prepare().then(()=>{
    const httpServer = createServer(handler);
    const io = new Server(httpServer);

    io.on("connection", (socket)=>{
        console.log("User Connected", socket.id);

        const emailToSocketMapping = new Map();

        // socket.on('join-room', (roomId)=>{
        //     socket.join(roomId);
        //     console.log("User joined room", roomId);
        // });
        
        socket.on("join-room", ({emailId, roomId, username})=>{
            console.log(`${username} joined room ${roomId}`);
            emailToSocketMapping.set(emailId, socket.id);
            socket.join(roomId);
            socket.emit("joined-room", {roomId});
            socket.broadcast.to(roomId).emit("user-joined", {username});
        })

        socket.on("user-joined", ({emailId})=>{
            console.log("user-joined", {emailId});
        })


        socket.on('message', (data)=>{
            // io.to(data.roomId).emit('message', data.message);
            console.log(data);
        })

        socket.on("disconnect", ()=>{
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

