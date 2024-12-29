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

        socket.on('join-room', (roomId)=>{
            socket.join(roomId);
            console.log("User joined room", roomId);
        });
        
        socket.on('message', (data)=>{
            io.to(data.roomId).emit('message', data.message);
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

