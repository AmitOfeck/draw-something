import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';

function WaitingRoom() {
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

    useEffect(async () => {
        const interval = setInterval(async () => {
            let answer = await Utils.getSnapshotLastStep(params.GameId)
                setSnapshot(answer)    
        } , 5000);
        return () => clearInterval(interval);
    },[])

    if(snapshot.GuessState == "In_Progress"){
        navigate('/'+params.UserId+'/'+params.GameId+'/Guess')
    }


    return (
        <div>
            <br/><br/><br/><br/>
            <h1>Waiting Room...</h1>
            <br/>
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>


        </div>
    );
}

export default WaitingRoom;