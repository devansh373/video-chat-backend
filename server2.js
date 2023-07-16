const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const { emit } = require('process');

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
})

app.use(cors());
const PORT = process.env.PORT || 5000;

const emailToIdMap = new Map()
const idToEmailMap = new Map()

io.on("connection",socket=>{
    // console.log("user connected with id:",socket.id)
    socket.on("room:join",data=>{
        console.log(data);
        const {email,room}=data;
        emailToIdMap.set(email,socket.id);
        idToEmailMap.set(socket.id,email);
        io.to(room).emit("user:joined",{email,id:socket.id})
        socket.join(room)
    io.to(socket.id).emit("room:join",data)
    })
})

server.listen(PORT,()=>console.log(`server listening on port ${PORT}`));