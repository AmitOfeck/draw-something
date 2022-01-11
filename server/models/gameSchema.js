var mongoose = require('mongoose')

var gameSchema = new mongoose.Schema({

  GameId : Number ,
  Users : [{UserName : String , UserId : Number}] ,
  Steps : [{
               Word : String ,
               Points : Number ,
               ActingUser : String ,
               Canvas : String ,
               PaintingState : String ,
               GuessState : String 
          }] ,
  Score : Number ,
  StartTime : Date ,
  EndTime : Date 
  
} , {versionKey: false})

module.exports = mongoose.model('games' , gameSchema)