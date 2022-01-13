import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';

function WaitingRoom() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        const interval = setInterval(async () => {
            let answer = await Utils.getSnapshotLastStep(params.GameId)
            console.log(params.UserId , answer)
            if(answer.PaintingState === "In_Progress" && answer.ActingUser !== params.UserId)
            {
                navigate('/'+params.UserId+'/'+params.GameId+'/Guess')
            }  
        } , 5000);
        return () => clearInterval(interval);
    },[])



    return (
        <div>
            <br/><br/><br/><br/>
            <h1>Waiting Room...</h1>
            <br/>
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>

            <br/><br/>

        </div>
    );
}

export default WaitingRoom;