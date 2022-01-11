import axios from "axios";

const gameByGameId = async (UserName , UserId ,GameId) => {
    var resp = await axios.get("http://localhost:8000/games/"+UserName+"/"+UserId+"/"+GameId);
    return resp.data
}

const newGame = async (UserName , UserId) => {
    var resp = await axios.post("http://localhost:8000/games/"+UserName+"/"+UserId)
    return resp.data
}

const updateGame = async (UserName , UserId , GameMongoId) => {
    var resp = await axios.put("http://localhost:8000/games/"+UserName+"/"+UserId+"/"+GameMongoId)
    return resp.data
}


export default {gameByGameId , newGame , updateGame}