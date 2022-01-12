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
        PaintingSt0te: "" ,
        Points: 0 ,
        Word: "" ,
        _id: "" ,
    })

    const [input , setInput] = useState("")

    useEffect(async () => {
        let answer = await Utils.getSnapshotLastStep(params.GameId)
        setSnapshot(answer)
    } ,[])

    useEffect(async () => {
        const interval = setInterval(async () => {
            let answer = await Utils.getSnapshotLastStep(params.GameId)
            setSnapshot(answer)
        } , 10000);
        return () => clearInterval(interval);
    })


    return (
        <div>
            <h2>Guess</h2>
            <img src={snapshot.Canvas} id="pic"></img>
            <h4>Length of the word  : {snapshot.Word.length}</h4>
            <input type="text" class="form-control" placeholder="Guess the word" aria-describedby="basic-addon1"
            onChange={(e) => setInput(e.target.value)}/>
            
        </div>
    );
}

export default Guess;