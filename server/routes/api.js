const express = require('express');
const gamesBL = require('../models/gamesBL');
const router = express.Router();

let randomNumbers = require('random-number');
let gen = randomNumbers.generator({

    min:  1000
  , max:  1000000
  , integer: true
  })

let currentDate = new Date();

//Get Game By Game Id
router.route('/:GameId').get(async (req, resp) => {
    const GameId = req.params.GameId;
    const data = await gamesBL.gameByGameId(GameId);
    return resp.json(data);
})

//Create New Step - new
router.route('/:UserId/:GameId').put(async (req, resp) => {
    const newStep = req.body; // json of the new step
    const GameId = req.params.GameId;
    const Game = await gamesBL.gameByGameId(GameId); // the old game
    const MongoId = Game[0]._id
    const answer = await gamesBL.CreateNewStep(newStep , Game[0] , MongoId);
    return resp.json(answer);
})

//Update Canvas - new
router.route('/:UserId/:GameId/setCanvas').put(async (req, resp) => {
    const canvas = req.body.Canvas; // string of the canvas from json
    const GameId = req.params.GameId;
    const Game = await gamesBL.gameByGameId(GameId); // the old game
    const MongoId = Game[0]._id
    const answer = await gamesBL.UpdateCanvas(canvas , Game[0] , MongoId);
    return resp.json(answer);
})

//Update Painting State - new
router.route('/:UserId/:GameId/PaintingState').put(async (req, resp) => {
    const PaintingState = req.body.PaintingState; // string of the PaintingState from json
    const GameId = req.params.GameId;
    const Game = await gamesBL.gameByGameId(GameId); // the old game
    const MongoId = Game[0]._id
    const answer = await gamesBL.UpdatePaintingState(PaintingState , Game[0] , MongoId);
    return resp.json(answer);
})

//Update Guess State - new
router.route('/:UserId/:GameId/GuessState').put(async (req, resp) => {
    const GuessState = req.body.GuessState; // string of the GuessState from json
    const GameId = req.params.GameId;
    const Game = await gamesBL.gameByGameId(GameId); // the old game
    const MongoId = Game[0]._id
    const answer = await gamesBL.UpdateGuessState(GuessState , Game[0] , MongoId);
    return resp.json(answer);
})

//Get Last Step
router.route('/:GameId/GetLastStep').get(async (req, resp) => {
    const GameId = req.params.GameId;
    const data = await gamesBL.gameByGameId(GameId);
    return resp.json(data[0].Step);
})

//Create Game
router.route('/CreateGame').post(async (req, resp) => {

    const UserName = req.body.UserName // {UserName : name}
    const UserId = gen()
    
    const newGame = {
        GameId : gen() ,
        Users : [{UserName : UserName , UserId : UserId}] ,
        Step : {
            Word : "",
            Points : 0,
            ActingUser : UserId,
            Canvas : "",
            PaintingState : "Not_Started",
            GuessState : "Not_Started"
        } ,
        Score : 0 ,
        Rating : -1 , 
        StartTime : currentDate ,
        EndTime : currentDate 
    }
    const answer = await gamesBL.createGame(newGame);
    return resp.json(answer);
})

//Join Game - new
router.route('/JoinGame').put(async (req, resp) => {
    const GameId = req.body.GameId; // {GameId : GameId , UserName : name}
    const JoinName = {
        UserName : req.body.UserName , 
        UserId : gen()
    }
    const Game = await gamesBL.gameByGameId(GameId); // the old game
    const MongoId = Game[0]._id
    Game[0].StartTime = new Date()
    Game[0].EndTime = undefined
    const answer = await gamesBL.JoinGame(JoinName ,Game[0] , MongoId);
    return resp.json(answer);
})

//Get StartTime
router.route('/:GameId/GetStartTime').get(async (req, resp) => {
    const GameId = req.params.GameId;
    const data = await gamesBL.gameByGameId(GameId);
    return resp.json(data[0].StartTime);
})

//Get Score
router.route('/:GameId/GetScore').get(async (req, resp) => {
    const GameId = req.params.GameId;
    const data = await gamesBL.gameByGameId(GameId);
    return resp.json(data[0].Score);
})

//Update End Game - new
router.route('/:GameId/UpdateEndGame').get(async (req, resp) => {
    
    const GameId = req.params.GameId;
    const Game = await gamesBL.gameByGameId(GameId); // the old game
    const MongoId = Game[0]._id;
    Game[0].EndTime = new Date();
    const answer = await gamesBL.EndGame(Game[0] , MongoId);
    return resp.json(answer);
})

//Update Bring Top Games - new
router.route('/:GameId/top-games').get(async (_, resp) => {
    const answer = await gamesBL.findMaxRate();
    return resp.json(answer);
})


module.exports = router;


