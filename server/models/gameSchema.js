var mongoose = require('mongoose')

var gameSchema = new mongoose.Schema({

  GameId : Number ,
  Users : [{UserName : String , UserId : Number}] ,
  Step : {
  Word : String ,
  Points : Number ,
  ActingUser : Number ,
  Canvas : String ,
  PaintingState : String ,
  GuessState : String 
   } ,
  Score : Number ,
  Rating : {type : Number , index : true} ,
  StartTime : Date ,
  EndTime : Date
  
} , {versionKey: false})

module.exports = mongoose.model('games' , gameSchema)