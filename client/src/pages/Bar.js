import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';


function Bar(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [score , setScore] = useState(0)

     useEffect(async () => {
        let points = await Utils.getScore(params.GameId)
        setScore(points)
    },[])

    const endGame = async () => {
    let answer = await Utils.endGame(params.GameId)
    navigate('/')
    }
 
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" id="navBarr">
               <div></div>
               <div className="gold">
                 {score} points
               </div>

               <div>
                 <button type="button" className="btn btn-danger" onClick = {() => endGame(params.GameId)}>End Game</button>
               </div>

            </nav>
        </div>
    );
}

export default Bar;