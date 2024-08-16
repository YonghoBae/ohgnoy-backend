const SocketIO = require("socket.io");

module.exports = (server) =>{
    const io = SocketIO(server, {
        path: "/socket.io",
        cors: {
        origin: "*",
        methods: ["GET", "POST"],
        },
    });


    io.on("connection",(socket)=>{
        socket.on("broadcast",function(msg){
            io.emit("receiveAll",msg);
        });
    })
}