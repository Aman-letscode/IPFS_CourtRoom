
//In-built Libraries
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require('http')
const server = http.createServer(app);
//User-defined function
const routes = require("./routes/routes");
const connect = require("./config/dbconnect");
const insertMessage = require("./controller/messages");

app.use(cors()); //using Cross-Origin Resource Sharing
app.use(express.json()); //use json for any data form
app.use(bodyParser.urlencoded({ extended: false })); //use body parser for url encoding

connect(process.env.MONGO_DB_URL); //connecting to the mongodb database

//using routes
app.use("/api/", routes);

const PORT = process.env.PORT || 4000; //connecting ports
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

//Http server listening
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//Creating a socket input/output
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//Connecting to socket
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;

  // Joining to roomId
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {


    const cond = insertMessage(data);//adding message to database
    
    console.log(data, " Sent");
    if (cond) {
      data = Object.assign(data,{
        time:cond.time
      });
      console.log(data, " Sent");
    } else {
      console.log(data, " not sent");
    }

    //Emiting the all message data
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});
