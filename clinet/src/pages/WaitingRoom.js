import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';

function WaitingRoom() {
    const params = useParams();
    const navigate = useNavigate();

    const goToDrawComp = () => {
       navigate('/'+params.UserId+'/'+params.GameId+'/Play')
    }


    return (
        <div>
            <br/><br/><br/><br/>
            <h1>Waiting Room...</h1>
            <br/>
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>

            <br/><br/>
            <button type="button" className="btn btn-outline-success" onClick={() => goToDrawComp()}>Change Link</button>

        </div>
    );
}

export default WaitingRoom;