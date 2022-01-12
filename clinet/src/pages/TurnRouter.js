import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';
import Play from './Play';
import Guess from './Guess';

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

    const [lestStep , setLastStep] = useState({
        ActingUser: "" ,
        Canvas: "" ,
        GuessState: "" ,
        PaintingSt0te: "" ,
        Points: 0 ,
        Word: "" ,
        _id: "" ,
    })

    useEffect(async () => {
        let answer = await Utils.gameByGameId(params.GameId)
        let game = {...answer[0]}
        setGame(game)

        let answer2 = await Utils.getSnapshotLastStep(params.GameId)  
        setLastStep(answer2)
    } ,[])


    return (  
    
        <div>
            <nav class="navbar navbar-dark bg-dark"  id="navbar">
               <div class="white">
               <p class="navbar-brand" class="white">Timer</p>
                </div>

                <div class="white">
               <p class="navbar-brand" class="gold"> {game.Score} Points</p>
                </div>

               <div class="container-fluid">
               <p class="navbar-brand" class="white">Draw & Guess</p>
               </div>

               <div>
               <button type="button" class="btn btn-danger">End Game</button> 
               </div>
            </nav>

        </div>
        
       
    );
}

export default TurnRouter;