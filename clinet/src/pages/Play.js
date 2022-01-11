import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';


function Play() {
    const params = useParams();
    const navigate = useNavigate();

    const [game , setGame] = useState({
        GameId : 123456 ,
        Users : [] ,
        Steps : [{}] ,
        Score : 0 ,
        StartTime : 2021-12-21 ,
        EndTime : 2021-12-21
    })

    useEffect(async () => {
        var answer = await Utils.gameByGameId(params.UserName , params.UserId , params.GameId)
        console.log(answer)
        setGame(answer[0])
    } ,[])

    return (
        <div>
            <h2>play</h2>
            <CanvasDraw
              style={{
              boxShadow:
              "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
               }} />
               <h2>You need to draw :</h2>
               <h4>{game.Steps[game.Steps.length-1].Word}</h4>
               <button type="button" class="btn btn-outline-success">Success</button>

        </div>
    );
}

export default Play;