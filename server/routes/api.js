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

// //Update Game
// router.route('/:UserId/:GameMongoId').put(async (req, resp) => {
//     const updatedGame = req.body;
//     const GameMongoId = req.params.GameMongoId;
//     const answer = await gamesBL.updateGame(GameMongoId , updatedGame);
//     return resp.json(answer);
// })

// //Update lastStep
// router.route('/:UserId/:GameId'+'/setLastStep').put(async (req, resp) => {
//     const updatedLastStep = req.body;
//     let answer = await gamesBL.gameByGameId(req.params.GameId);
//     let game = answer[0];
//     let steps = game.Steps;
//     let lastStep = steps[steps.length - 1];
//     lastStep.Canvas = updatedLastStep.Canvas;
//     lastStep.PaintingState = updatedLastStep.PaintingState;
//     lastStep.GuessState = updatedLastStep.GuessState;
//     // maybe should be removed
//     steps[steps.length-1] = lastStep;
//     // steps[indexLastStep] = updatedLastStep;
//     game.Steps = steps;
//     const GameMongoId = game._id;
//     const answer2 = await gamesBL.updateGame(GameMongoId , game);
//     return resp.json(answer2);
// })

// // set canvas
// router.route('/:UserId/:GameId'+'/setCanvas').put(async (req, resp) => {
//     const updatedLastStep = req.body;
//     let answer = await gamesBL.gameByGameId(req.params.GameId);
//     let game = answer[0];
//     let steps = game.Steps;
//     let lastStep = steps[steps.length - 1];
//     lastStep.Canvas = updatedLastStep.Canvas;
//     // maybe should be removed
//     steps[steps.length-1] = lastStep;
//     // steps[indexLastStep] = updatedLastStep;
//     game.Steps = steps;
//     const GameMongoId = game._id;
//     const answer2 = await gamesBL.updateGame(GameMongoId , game);
//     return resp.json(answer2);
// })

// set Guessing State
router.route('/:UserId/:GameId'+'/Guess').put(async (req, resp) => {
    const updatedLastStep = req.body;
    let answer = await gamesBL.gameByGameId(req.params.GameId);
    let game = answer[0];
    let steps = game.Steps;
    let lastStep = steps[steps.length - 1];
    lastStep.GuessState = updatedLastStep.GuessState;
    // maybe should be removed
    steps[steps.length-1] = lastStep;
    // steps[indexLastStep] = updatedLastStep;
    game.Steps = steps;
    const GameMongoId = game._id;
    const answer2 = await gamesBL.updateGame(GameMongoId , game);
    return resp.json(answer2);
})

// set Paint State
router.route('/:UserId/:GameId'+'/PaintState').put(async (req, resp) => {
    const updatedLastStep = req.body;
    let answer = await gamesBL.gameByGameId(req.params.GameId);
    let game = answer[0];
    let steps = game.Steps;
    let lastStep = steps[steps.length - 1];
    lastStep.PaintingState = updatedLastStep.PaintingState;
    // maybe should be removed
    steps[steps.length-1] = lastStep;
    // steps[indexLastStep] = updatedLastStep;
    game.Steps = steps;
    const GameMongoId = game._id;
    const answer2 = await gamesBL.updateGame(GameMongoId , game);
    return resp.json(answer2);
})



module.exports = router;


