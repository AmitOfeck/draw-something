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




const newGame = async (UserId) => {
    let resp = await axios.post("http://localhost:8000/games/"+UserId)
    return resp.data
}


const getSnapshotLastStep = async (GameId) => {
    let resp = await axios.get("http://localhost:8000/games/"+GameId);
    let lastStepIndex = resp.data[0].Steps.length-1
    let lastStepData = resp.data[0].Steps[lastStepIndex]
    return lastStepData
}

// const updateLastStep = async (UserId , GameId , snapshot) => {
//     let resp = await axios.put("http://localhost:8000/games/"+UserId+"/"+GameId+"/setLastStep" , snapshot)
//     return resp.data
// }




// const setNextTurn = async (UserId , GameId , word) => {
//     let resp = await axios.get("http://localhost:8000/games/"+GameId);
//     let game = {...resp.data[0]}
//     let newStep = {
//         ActingUser : UserId ,
//         Canvas : "" ,
//         GuessState: "In_Progress" ,
//         PaintingState: "In_Progress" ,
//         Points : word.points ,
//         Word : word.word
//     }
//     game.Steps.push(newStep)

//     console.log(newStep)
//     console.log(game)
    
//     let resp2 = await axios.put("http://localhost:8000/games/"+UserId+"/"+game._id , game)
//     return resp2.data
// }


export default {gameByGameId , setNextStep , getSnapshotLastStep , newGame ,updateCanvas ,updateGuess ,updatePaintState , getLastStep}