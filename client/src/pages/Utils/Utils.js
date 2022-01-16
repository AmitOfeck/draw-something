import axios from "axios";

const baseUrl = "http://localhost:8000/games/" // if we want back to heroku "https://draw-guess-app-server.herokuapp.com/games/"

const gameByGameId = async (GameId) => {
    let resp = await axios.get(baseUrl+GameId);
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
    
    let resp = await axios.put(baseUrl+UserId+"/"+GameId, newStep)
    return resp.data
}

const updateCanvas = async (UserId , GameId , Canvas) => { //new
    let resp = await axios.put(baseUrl+UserId+"/"+GameId+"/setCanvas" , Canvas)
    return resp.data
}

const updatePaintState = async (UserId , GameId , PaintingState) => { //new
    let resp = await axios.put(baseUrl+UserId+"/"+GameId+"/PaintingState" , PaintingState)
    return resp.data
}

const updateGuess = async (UserId , GameId , GuessState) => { //new
    let resp = await axios.put(baseUrl+UserId+"/"+GameId+"/GuessState" , GuessState)
    return resp.data
}

const getLastStep = async (GameId) => {
    let resp = await axios.get(baseUrl+GameId+"/getLastStep");
    return resp.data
}

const newGame = async (UserName) => {
    let resp = await axios.post(baseUrl+"CreateGame" , UserName)
    return resp.data
}

const joinGame = async (obj) => {
    let resp = await axios.put(baseUrl+"JoinGame" , obj)
    return resp.data
}

const getStartTime = async (GameId) => { //new
    let resp = await axios.get(baseUrl+GameId+"/GetStartTime");
    return resp.data
}

const getScore = async (GameId) => { //new
    let resp = await axios.get(baseUrl+GameId+"/GetScore");
    return resp.data
}

const endGame = async (GameId) => { //new
    let resp = await axios.get(baseUrl+GameId+"/UpdateEndGame");
    return resp.data
}

const getRecords = async () => { //new
    let resp = await axios.get(baseUrl+123456+"/top-games");
    return resp.data
}


export default {gameByGameId , setNextStep , updateCanvas , updatePaintState , updateGuess , getLastStep , newGame , joinGame , getStartTime , getScore , endGame , getRecords}