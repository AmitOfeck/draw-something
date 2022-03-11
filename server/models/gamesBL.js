let gameSchema = require('./gameSchema')

// key is userId, value is WS
const webSockets = new Map();

// Maybe add another map key is WS userId is value
// const reverseWS = new Map()




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
        Rating : Game.Rating , 
        _id : MongoId ,
        StartTime : Game.StartTime ,
        EndTime : Game.EndTime
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
        Rating : Game.Rating ,
        _id : MongoId ,
        StartTime : Game.StartTime ,
        EndTime : Game.EndTime
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
        Rating : Game.Rating ,
        _id : MongoId ,
        StartTime : Game.StartTime ,
        EndTime : Game.EndTime
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
        Rating : Game.Rating ,
        _id : MongoId ,
        StartTime : Game.StartTime ,
        EndTime : Game.EndTime
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
        Rating : newGame.Rating ,
        StartTime : newGame.StartTime ,
        EndTime : newGame.EndTime
    })

    await gameToAdd.save()
    return gameToAdd
   
}

const JoinGame =  async (JoinName , Game , MongoId) => {
    let Users = Game.Users;
    
    Users.push(JoinName)

    const gameToAdd = new gameSchema({
        GameId : Game.GameId ,
        Users : Game.Users ,
        Step : Game.Step ,
        Score : Game.Score ,
        Rating : Game.Rating ,
        _id : MongoId ,
        StartTime : Game.StartTime ,
        EndTime : Game.EndTime
    })

    await gameSchema.findByIdAndUpdate(MongoId , gameToAdd)
    gameToAdd.Users.forEach((user) => {
        const socket = webSockets.get(user.UserId)
        if(socket) {
        socket.send(JSON.stringify(gameToAdd))
        }
        else {
            console.log('socket not found')
        }
    })
    return gameToAdd
   
}

const EndGame =  async (Game , MongoId) => { //new
    
   const time = Game.EndTime.valueOf() - Game.StartTime.valueOf()
   const Rate = (Game.Score/time) * 10000

    const gameToAdd = new gameSchema({
        GameId : Game.GameId ,
        Users : Game.Users ,
        Step : Game.Step ,
        Score : Game.Score ,
        Rating : Rate ,
        _id : MongoId ,
        StartTime : Game.StartTime ,
        EndTime : Game.EndTime
    })

    await gameSchema.findByIdAndUpdate(gameToAdd._id , gameToAdd)
    return gameToAdd
}

const findMaxRate = async () => {
    return await gameSchema.find().sort({Rating:-1}).limit(5)

}


module.exports = {gameByGameId , CreateNewStep , UpdateCanvas , UpdatePaintingState , UpdateGuessState , createGame , JoinGame , EndGame , findMaxRate, webSockets};
