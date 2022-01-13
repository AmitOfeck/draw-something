const express = require('express');
const gamesBL = require('../models/gamesBL');

const router = express.Router();

//Get Game By Game Id
router.route('/:GameId').get(async (req, resp) => {
    const GameId = req.params.GameId;
    const data = await gamesBL.gameByGameId(GameId);
    return resp.json(data);
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

//Update Game
router.route('/:UserId/:GameMongoId').put(async (req, resp) => {
    const updatedGame = req.body;
    const GameMongoId = req.params.GameMongoId;
    const answer = await gamesBL.updateGame(GameMongoId , updatedGame);
    return resp.json(answer);
})

//Update lastStep
// router.route('/:UserId/:GameId'+'/updateLastStep').put(async (req, resp) => {

//     console.log(req.body)

//     // let answer = await gamesBL.gameByGameId(req.params.GameId);
//     // let game = answer[0]
//     // let steps = [...game.Steps];
//     // let indexLastStep = steps.length - 1;
//     // steps[indexLastStep] = updatedLastStep;
//     // game.Steps = steps;
//     // const GameMongoId = game._id;


//     // const answer2 = await gamesBL.updateGame(GameMongoId , game);
//     // return resp.json(answer2);
// })

// set Next Turn
router.route('/:UserId/:GameId'+'/setNextTurn').put(async (req, resp) => {
    const updatedLastStep = req.body;
    const GameMongoId = updatedLastStep._id;
    const answer2 = await gamesBL.updateGame(GameMongoId , updatedLastStep);
    return resp.json(answer2);
})


module.exports = router;


