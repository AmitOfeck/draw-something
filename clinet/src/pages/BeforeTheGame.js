import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';


function BeforeTheGame(props) {
    const params = useParams();
    const navigate = useNavigate();


    return (
        <div>
             <br/><br/><br/><br/>
             <h2>Pin Code : {params.GameId}</h2>
             <br/><br/>
             <h2>Waiting To The Second Player</h2>
             <br/>
             <div className="spinner-border text-primary" role="status">
             </div>

             <br/><br/>
        </div>
    );
}

export default BeforeTheGame;