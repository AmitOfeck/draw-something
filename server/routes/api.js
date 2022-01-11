const express = require('express');
const gamesBL = require('../models/gamesBL');

const router = express.Router();

//Get Game By Game Id
router.route('/:UserName/:UserId/:GameId').get(async (req, resp) => {
    const GameId = req.params.GameId;
    const data = await gamesBL.gameByGameId(GameId);
    return resp.json(data);
})

//Create Game
router.route('/:UserName/:UserId').post(async (req, resp) => {

    const UserName = req.params.UserName;
    const UserId = req.params.UserId;
    const newGame = req.body;
    const answer = await gamesBL.createGame(UserName , UserId , newGame);

    return resp.json(answer);
})

//Update Game
router.route('/:UserName/:UserId/:GameId').put(async (req, resp) => {
    const updatedGame = req.body;
    const GameId = req.params.GameId;
    const answer = await gamesBL.updateGame(GameId , updatedGame);
    return resp.json(answer);
})

module.exports = router;


