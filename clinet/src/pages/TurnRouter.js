import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';

function TurnRouter() {
    const params = useParams();
    const navigate = useNavigate();

    const [game , setGame] = useState({
        _id: "",
        GameId: 123456,
        Users: [],
        Steps: [],
        Score: 8,
        Timer : 0
    })

    useEffect(async () => {
        let answer = await Utils.gameByGameId(params.GameId)
        let game = {...answer[0]}
        console.log(game)
        setGame(answer[0])
    } ,[])


    return (  
        
        <div>
            hi
        </div>
    );
}

export default TurnRouter;