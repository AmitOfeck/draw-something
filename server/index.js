var express = require('express');
var api = require('./routes/api');

var app = express();

//webSocket
const WebSocket = require("ws")
const wss = new WebSocket.Server({port : 8080})
wss.on("connection" , ws => {
  console.log("New client connected");

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