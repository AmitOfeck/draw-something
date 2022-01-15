import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';
import Bar from './Bar';

function WaitingRoom() {
    const params = useParams();
    const navigate = useNavigate();
    let interval;

    const [snapshot , setSnapshot] = useState({
        ActingUser: "" ,
        Canvas: "" ,
        GuessState: "" ,
        PaintingState: "" ,
        Points: 0 ,
        Word: "" ,
        _id: "" ,
    })

    useEffect(async () => {
            interval = setInterval(async () => {
            let answer = await Utils.getLastStep(params.GameId)
            setSnapshot(answer)
            
        } , 3000);
        return () => clearInterval(interval);
    },[])

    if(snapshot.PaintingState === "In_Progress")
        {
                if(snapshot.ActingUser.toString() === params.UserId){
                    console.log("waiting room --- play")
                    clearInterval(interval)
                    navigate('/'+params.UserId+'/'+params.GameId+'/Play')
                }
                else if(snapshot.ActingUser.toString() !== params.UserId){
                    console.log("waiting room --- Guess")
                    clearInterval(interval)
                    navigate('/'+params.UserId+'/'+params.GameId+'/Guess')

                }
                else{
                    console.log("else")
                }
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

        </div>
    );
}

export default WaitingRoom;