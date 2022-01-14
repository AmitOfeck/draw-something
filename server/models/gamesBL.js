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
        Step : Game.Step ,
        Score : Game.Score ,
        Timer : Game.Timer ,
        _id : MongoId
    })

    await gameSchema.findByIdAndUpdate(gameToAdd._id , gameToAdd)
    return gameToAdd._id
}

const UpdatePaintingState =  async (PaintingState , Game , MongoId) => { //new

    Game.Step.PaintingState = PaintingState; 

    const gameToAdd = new gameSchema({
        GameId : Game.GameId ,
        Users : Game.Users ,
        Step : Game.Step ,
        Score : Game.Score ,
        Timer : Game.Timer ,
        _id : MongoId
    })

    await gameSchema.findByIdAndUpdate(gameToAdd._id , gameToAdd)
    return gameToAdd._id
}

const UpdateGuessState =  async (GuessState , Game , MongoId) => { //new

    Game.Step.GuessState = GuessState; 

    const gameToAdd = new gameSchema({
        GameId : Game.GameId ,
        Users : Game.Users ,
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
        Step : newGame.Step ,
        Score : newGame.Score ,
        Timer : newGame.Timer
    })

    await gameToAdd.save()
    return gameToAdd.GameId
   
}



module.exports = {gameByGameId , CreateNewStep , UpdateCanvas , UpdatePaintingState , UpdateGuessState , createGame};
