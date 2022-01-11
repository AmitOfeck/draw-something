import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';


function Play() {
    const params = useParams();
    const navigate = useNavigate();

    const [game , setGame] = useState({
        ActingUser: "" ,
        Canvas: "" ,
        GuessState: "" ,
        PaintingSt0te: "" ,
        Points: 0 ,
        Word: "" ,
        _id: "" ,
    })

    useEffect(async () => {
        var answer = await Utils.getSnapshotLastStep(params.UserName , params.UserId , params.GameId)
        setGame(answer)
    } ,[])

    const updatePaint = (e) => {
        // let imgURL = e.getSaveData();
        // console.log(imgURL)
        // let index = game.Steps.length-1
        // let step = {...game.Steps[index]}
        // step.Canvas = imgURL;
        // console.log(step) 
    }

    return (
        <div>
            <h2>play</h2>
            <CanvasDraw
              style={{ boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"}} 
              onChange={(e) => updatePaint(e) } />
               <h2>You need to draw :</h2>
               {/* <h4>{game.Steps[game.Steps.length-1].Word}</h4> */}
               <button type="button" class="btn btn-outline-success">Finish</button>
    

        </div>
    );
}

export default Play;