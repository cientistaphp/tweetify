const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("MongoDB conectado OK");
});

app.use((req, res, next) => {
   req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

//app.get('/',(req,res)=>{
//    return res.send('Hello World');
//});

server.listen(3000, ()=>{
    console.log('Server started on port 3000');
});