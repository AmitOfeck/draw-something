const express = require('express');
const gamesBL = require('../models/gamesBL');

const router = express.Router();

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
router.route('/:UserId/:GameId').post(async (req, resp) => {

    const UserId = req.params.UserId;
    const GameId = req.params.GameId;
    // const newGame = req.body;
    const newGame = {
        GameId : GameId ,
        Users : [{UserName : "" , UserId : UserId}] ,
        Steps : [] ,
        Score : 0 ,
        Timer : 0
    }
    const answer = await gamesBL.createGame(newGame);

    return resp.json(answer);
})


module.exports = router;


