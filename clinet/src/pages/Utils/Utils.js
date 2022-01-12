import axios from "axios";

const gameByGameId = async (GameId) => {
    let resp = await axios.get("http://localhost:8000/games/"+GameId);
    return resp.data
}

const getSnapshotLastStep = async (GameId) => {
    let resp = await axios.get("http://localhost:8000/games/"+GameId);
    let lastStepIndex = resp.data[0].Steps.length-1
    let lastStepData = resp.data[0].Steps[lastStepIndex]
    return lastStepData
}

const newGame = async (UserName , UserId) => {
    let resp = await axios.post("http://localhost:8000/games/"+UserName+"/"+UserId)
    return resp.data
}

const updateLastStep = async (UserName , UserId , GameId , snapshot) => {
    let resp = await axios.put("http://localhost:8000/games/"+UserName+"/"+UserId+"/"+GameId+"/setLastStep" , snapshot)
    return resp.data
}

const updateGame = async (UserId , GameMongoId) => {
    let resp = await axios.put("http://localhost:8000/games/"+UserId+"/"+GameMongoId)
    return resp.data
}

const setNextTurn = async (UserId , GameId , word) => {
    let resp = await axios.get("http://localhost:8000/games/"+GameId);
    let game = {...resp.data[0]}
    let newStep = {
        ActingUser : UserId ,
        Canvas : "" ,
        GuessState: "In_Progress" ,
        PaintingState: "In_Progress" ,
        Points : word.points ,
        Word : word.word
    }
    game.Steps.push(newStep)
    console.log(game)
    
    // let resp = await axios.put("http://localhost:8000/games/nextTurn/"+UserId+"/"+GameId , word)
    // return resp.data
}


export default {gameByGameId , getSnapshotLastStep , newGame , updateLastStep , updateGame , setNextTurn}