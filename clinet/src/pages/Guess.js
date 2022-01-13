import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';


function Guess() {
    const params = useParams();
    const navigate = useNavigate();

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
        let answer = await Utils.getSnapshotLastStep(params.GameId)
        setSnapshot(answer)
    } ,[])

    useEffect(async () => {
        const interval = setInterval(async () => {
            let answer = await Utils.getSnapshotLastStep(params.GameId)
                setSnapshot(answer)    
        } , 5000);
        return () => clearInterval(interval);
    },[])

    useEffect(async () => {
        if(snapshot.Word.toUpperCase() == input.toUpperCase()){
            await Utils.updateLastStep(params.UserId , params.GameId , {...snapshot , GuessState : "Done"})
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

    if(snapshot.PaintingState == "Done" && snapshot.GuessState == "Done")
    {
        navigate('/'+params.UserId+'/'+params.GameId+'/ChooseWords')
    }

    return (
        <div>
            <h2>Guess</h2>
            <img src={snapshot.Canvas} id={frame}></img>
            <br/> <br/>
            {/* <h4>Length of the word  : {snapshot.Word.length}</h4> */}
            {GuessInput}
            
        </div>
    );
}

export default Guess;