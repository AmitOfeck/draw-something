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

const newGame = async (UserId) => {
    let resp = await axios.post("http://localhost:8000/games/"+UserId)
    return resp.data
}

const updateLastStep = async (UserId , GameId , snapshot) => {
    let resp = await axios.put("http://localhost:8000/games/"+UserId+"/"+GameId+"/setLastStep" , snapshot)
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

    console.log(newStep)
    console.log(game)
    
    let resp2 = await axios.put("http://localhost:8000/games/"+UserId+"/"+game._id , game)
    return resp2.data
}


export default {gameByGameId , getSnapshotLastStep , newGame , updateLastStep , setNextTurn}