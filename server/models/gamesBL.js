var gameSchema = require('./gameSchema')


const gameByGameId =  async (GameId) => {
    return await gameSchema.find({GameId: GameId})
}

const createGame =  async (UserName , UserId , newGame) => {

    const gameToAdd = new gameSchema({
        GameId : newGame.GameId ,
        Users : [{UserName : UserName , UserId : UserId}] ,
        Steps : newGame.Steps ,
        Score : newGame.Score ,
        Timer : newGame.Timer
    })

    await gameToAdd.save()
    return gameToAdd._id
   
}

const updateGame =  async (GameMongoId , updatedGame) => {

    const gameToUpdate = new gameSchema({

        _id : GameMongoId  ,
        GameId : updatedGame.GameId ,
        Users : updatedGame.Users ,
        Steps : updatedGame.Steps ,
        Score : updatedGame.Score ,
        Timer : updatedGame.Timer
    })

    await gameSchema.findByIdAndUpdate(GameMongoId , gameToUpdate)
    return gameToUpdate._id
   
}


module.exports = {gameByGameId , createGame , updateGame};
