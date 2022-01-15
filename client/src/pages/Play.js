import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';
import Bar from './Bar';


function Play() {
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

    useEffect(async () => {
        await Utils.updateCanvas(params.UserId , params.GameId , {Canvas : snapshot.Canvas})
    } ,[snapshot])

    const finish = async () => {
        await Utils.updatePaintState(params.UserId , params.GameId , {PaintingState : "Done"})
    }

    if(snapshot.PaintingState === "Done" && snapshot.GuessState === "Done" && snapshot.ActingUser.toString() === params.UserId)
    {
        console.log("play--- wait")
        clearInterval(interval)
        navigate('/'+params.UserId+'/'+params.GameId+'/WaitingRoom')
    }
    if(snapshot.ActingUser && snapshot.ActingUser.toString() !== params.UserId){
        console.log("play--- Guess")
        console.log("ActingUser " , snapshot.ActingUser)
        console.log("UserId " , params.UserId)
        
        clearInterval(interval)
        navigate('/'+params.UserId+'/'+params.GameId+'/Guess')
    }

    return (
        <div>
            <Bar/>
            <h2>Draw</h2>
            <div id="drawBoard">
                <div></div> 

                <div>
                <CanvasDraw
                style={{ boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"}} 
                onChange={(e) => {setSnapshot({...snapshot , Canvas : e.getDataURL()})} } />

               <h2>You need to draw :</h2>
               <h4> {snapshot.Word} </h4>
               <button type="button" className="btn btn-outline-success" onClick={() => finish()}>Finish</button>
               </div>

               <div></div>
            </div>
    

        </div>
    );
}

export default Play;