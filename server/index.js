var express = require('express');
var api = require('./routes/api');
const gamesBL = require('./models/gamesBL');

var app = express();

//webSocket
const WebSocket = require("ws")

const wss = new WebSocket.Server({port : 8080})


wss.on("connection" , ws => {
  console.log("New client connected");

  
  ws.on("message" , data => {
  console.log(`Client has sent us: ${data}`)
  const { userId } = JSON.parse(data);
  console.log(userId)
  if(userId) {
    console.log("in")
    console.log(gamesBL.webSockets.size)
    gamesBL.webSockets[userId] = ws
    gamesBL.reverseWS.set(ws,userId)
    console.log(Object.keys(gamesBL.webSockets));
  }
  // ws.send("Messeage from server to client :" + data)
  });

  ws.on("close", () => {
    const key = gamesBL.reverseWS.get(ws)
    gamesBL.reverseWS.delete(key)
    console.log("Client has disconnected")
  });

})
//////////

require ('./configs/dataBase')
require('dotenv').config()

var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(cors());

app.use('/games' , api);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('The server is listening')
});