var gameSchema = require('./gameSchema')


const gameByGameId =  async (GameId) => {
    return await gameSchema.find({GameId: GameId})
}

const CreateNewStep =  async (newStep , Game , MongoId) => { //new

    const pointsFtomPreviosStep = Game.Step.Points
    let newScore = Game.Score
    newScore = newScore + pointsFtomPreviosStep

    Game.Score = newScore
    Game.Step = {...newStep}; 

    const gameToAdd = new gameSchema({
        GameId : Game.GameId ,
        Users : Game.Users ,
        Steps : Game.Steps ,
        Step : Game.Step ,
        Score : Game.Score ,
        Timer : Game.Timer , 
        _id : MongoId
    })
    
    await gameSchema.findByIdAndUpdate(MongoId , gameToAdd)
    return gameToAdd._id
}

const UpdateCanvas =  async (canvas , Game , MongoId) => { //new

    Game.Step.Canvas = canvas; 

    const gameToAdd = new gameSchema({
        GameId : Game.GameId ,
        Users : Game.Users ,
        Steps : Game.Steps ,
        Step : Game.Step ,
        Score : Game.Score ,
        Timer : Game.Timer ,
        _id : MongoId
    })

    await gameSchema.findByIdAndUpdate(gameToAdd._id , gameToAdd)
    return gameToAdd._id
}









const createGame =  async (newGame) => {

    const gameToAdd = new gameSchema({
        GameId : newGame.GameId ,
        Users : newGame.Users ,
        Steps : newGame.Steps ,
        Step : newGame.Step ,
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
        Step : updatedGame.Step ,
        Score : updatedGame.Score ,
        Timer : updatedGame.Timer
    })

    await gameSchema.findByIdAndUpdate(GameMongoId , gameToUpdate)
    return gameToUpdate._id
   
}


module.exports = {gameByGameId , createGame , updateGame , CreateNewStep , UpdateCanvas};
