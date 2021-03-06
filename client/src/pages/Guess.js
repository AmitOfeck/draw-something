import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';
import Bar from './Bar';


function Guess() {
    const params = useParams();
    const navigate = useNavigate();
    let interval;

    const [snapshot , setSnapshot] = useState({
        ActingUser: "" ,
        Canvas: "" ,
        GuessState: "" ,
        PaintingState: "" ,
        Points: 0 ,
        Word: "" , 
        _id: "" ,
    })

    const [input , setInput] = useState("xbhjchjb")

    useEffect(async () => {
            interval = setInterval(async () => {
            let answer = await Utils.getLastStep(params.GameId)
                setSnapshot(answer)    
        } , 3000);
        return () => clearInterval(interval);
    },[])

    useEffect(async () => {
        if(snapshot.Word !== "" && snapshot.Word !== null && snapshot.Word.toUpperCase() === input.toUpperCase()){
            await Utils.updateGuess(params.UserId , params.GameId , {GuessState : "Done"})
            clearInterval(interval)
            navigate('/'+params.UserId+'/'+params.GameId+'/ChooseWords')
        }
    } ,[input])

    let mark = ""
    for(let i = 0; i <snapshot.Word.length; i++){
        mark = mark + "_       "
    }

    let GuessInput = <div></div>

    let frame = "unfinishedPaint";
    if(snapshot.PaintingState == "Done"){
        frame = "finishedPaint";
        GuessInput = <div id="blue">
            <h1>{mark}</h1>
            <input type="text" className="form-control" placeholder="Guess the word" aria-describedby="basic-addon1"
            onChange={(e) => setInput(e.target.value)} />
        </div>
    }


    return (
        <div>
            <Bar/>
            <h2>Guess</h2>
            <img src={snapshot.Canvas} id={frame}></img>
            <br/> <br/>
            {/* <h4>Length of the word  : {snapshot.Word.length}</h4> */}
            {GuessInput}
            
        </div>
    );
}

export default Guess;