import axios from "axios";

const gameByGameId = async (GameId) => {
    var resp = await axios.get("http://localhost:8000/games/"+GameId);
    return resp.data
}

const getSnapshotLastStep = async (GameId) => {
    var resp = await axios.get("http://localhost:8000/games/"+GameId);
    let lastStepIndex = resp.data[0].Steps.length-1
    let lastStepData = resp.data[0].Steps[lastStepIndex]
    return lastStepData
}

const newGame = async (UserName , UserId) => {
    var resp = await axios.post("http://localhost:8000/games/"+UserName+"/"+UserId)
    return resp.data
}

const updateLastStep = async (UserName , UserId , GameId , snapshot) => {
    var resp = await axios.put("http://localhost:8000/games/"+UserName+"/"+UserId+"/"+GameId+"/setLastStep" , snapshot)
    return resp.data
}

const updateGame = async (UserName , UserId , GameMongoId) => {
    var resp = await axios.put("http://localhost:8000/games/"+UserName+"/"+UserId+"/"+GameMongoId)
    return resp.data
}


export default {gameByGameId , getSnapshotLastStep , newGame , updateLastStep , updateGame}