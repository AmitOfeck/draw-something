import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';

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

    return (
        <div>
            <h2>Guess</h2>

            <img src={snapshot.Canvas}></img>


            
        </div>
    );
}

export default Guess;