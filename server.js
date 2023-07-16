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

// let idToSend={};
// let id='';
app.use(cors());
const PORT = process.env.PORT|| 5000;





io.on('connection',(socket)=>{
    // id=socket.id;
    // idToSend.id=socket.id;
    socket.emit("me",socket.id);
    
    socket.on('disconnect',()=>{
        socket.broadcast.emit("callEnded");
    })

    socket.on('callUser',({userToCall,signalData,from,name})=>{
        io.to(userToCall).emit("callUser",{signal:signalData,from,name});
    })
    socket.on("answerCall",(data)=>{
        io.to(data.to).emit("callAccepted",data.signal);
    })
})
app.get('/',(req,res)=>{
    res.send("server running...")
})


// app.get('/:id',(req,res)=>{
//     // console.log(req.params.id)
//     // res.send()
//     res.send(req.params)
// })

// app.get(`${idToSend.id}`,(req,res)=>{
//     res.send(idToSend)
//     console.log(idToSend)
// })
server.listen(PORT,()=>console.log(`server listening on port ${PORT}`));