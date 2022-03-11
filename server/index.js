var express = require('express');
var api = require('./routes/api');

var app = express();

//webSocket
const WebSocket = require("ws")

const wss = new WebSocket.Server({port : 8080})
const clients = {};
let i = 0;


wss.on("connection" , ws => {
  console.log("New client connected");
  clients['foo'] = ws;


  ws.on("message" , data => {
  console.log(`Client has sent us: ${data}`)

  ws.send("Messeage from server to client :" + data)
  });

  ws.on("close", () => {
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