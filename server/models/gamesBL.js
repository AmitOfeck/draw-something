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
        StartTime : newGame.StartTime ,
        EndTime : newGame.EndTime 
    })

    await gameToAdd.save()
    return gameToAdd._id
   
}

const updateGame =  async (GameId , updatedNote) => {

    const gameToUpdate = new gameSchema({

        // _id : GameId ,
        GameId : GameId ,
        Users : updatedNote.Users ,
        Steps : updatedNote.Steps ,
        Score : updatedNote.Score ,
        StartTime : updatedNote.StartTime ,
        EndTime : updatedNote.EndTime 
    })

    await gameSchema.findByIdAndUpdate(GameId , gameToUpdate)
    return gameToUpdate._id
   
}


module.exports = {gameByGameId , createGame , updateGame};
