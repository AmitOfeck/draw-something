import axios from "axios";

const gameByGameId = async (GameId) => {
    let resp = await axios.get("http://localhost:8000/games/"+GameId);
    return resp.data
}

const setNextStep = async (UserId , GameId , word) => { //new

    let newStep = {
        ActingUser : UserId ,
        Canvas : "" ,
        GuessState: "In_Progress" ,
        PaintingState: "In_Progress" ,
        Points : word.points ,
        Word : word.word
    }
    
    let resp = await axios.put("http://localhost:8000/games/"+UserId+"/"+GameId, newStep)
    return resp.data
}

const updateCanvas = async (UserId , GameId , Canvas) => { //new
    let resp = await axios.put("http://localhost:8000/games/"+UserId+"/"+GameId+"/setCanvas" , Canvas)
    return resp.data
}

const updatePaintState = async (UserId , GameId , PaintingState) => { //new
    let resp = await axios.put("http://localhost:8000/games/"+UserId+"/"+GameId+"/PaintingState" , PaintingState)
    return resp.data
}

const updateGuess = async (UserId , GameId , GuessState) => { //new
    let resp = await axios.put("http://localhost:8000/games/"+UserId+"/"+GameId+"/GuessState" , GuessState)
    return resp.data
}

const getLastStep = async (GameId) => {
    let resp = await axios.get("http://localhost:8000/games/"+GameId+"/getLastStep");
    return resp.data
}

const newGame = async (UserName) => {
    let resp = await axios.post("http://localhost:8000/games/CreateGame" , UserName)
    return resp.data
}

const joinGame = async (obj) => {
    let resp = await axios.put("http://localhost:8000/games/JoinGame" , obj)
    return resp.data
}


export default {gameByGameId , setNextStep , updateCanvas , updatePaintState , updateGuess , getLastStep , newGame , joinGame}