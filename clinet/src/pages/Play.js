import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';


function Play() {
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

    useEffect(async () => {
        var answer = await Utils.getSnapshotLastStep(params.GameId)
        setSnapshot(answer)
    } ,[])

    useEffect(async () => {
        var answer = await Utils.updateLastStep(params.UserName , params.UserId , params.GameId , snapshot)
    } ,[snapshot.Canvas])

    return (
        <div>
            <h2>Play</h2>
            <CanvasDraw
              style={{ boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"}} 
              onChange={(e) => {setSnapshot({...snapshot , Canvas : e.getDataURL()})} } />

               <h2>You need to draw :</h2>
               <h4> {snapshot.Word} </h4>
               <button type="button" class="btn btn-outline-success">Finish</button>
    

        </div>
    );
}

export default Play;