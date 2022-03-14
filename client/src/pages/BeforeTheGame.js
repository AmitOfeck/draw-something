import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';


function BeforeTheGame(props) {
    const params = useParams();
    const navigate = useNavigate();
    let interval;

    const [game , setGame] = useState({
        _id: "" ,
        GameId: 0 ,
        Score: 0 ,
        Step: {} ,
        Timer: 0 ,
        Users: [] ,
    })

    useEffect(async () => {
        console.log('sending!')
        console.log(params.UserId)
        const message = { userId: params.UserId }
        props.ws?.send(JSON.stringify(message))

        let answer = await Utils.gameByGameId(params.GameId)
        if(answer[0] !== game){
            setGame(answer[0])    
        }
    }, [])

    props.ws?.addEventListener("message" , message => {
        console.log('got a message',  JSON.parse(message.data).message)
        const game = JSON.parse(message.data).game;
        setGame(game);
      });


    // useEffect(async () => {
    //         interval = setInterval(async () => {
    //         let answer = await Utils.gameByGameId(params.GameId)
    //         if(answer[0] !== game)
    //         setGame(answer[0])    
    //     } , 3000);
    //     return () => clearInterval(interval);
    // },[])


    if(game.Users.length === 2)
    {

        if(game.Step.ActingUser.toString() === params.UserId)
        {
            clearInterval(interval)
            navigate('/'+params.UserId+'/'+params.GameId+'/ChooseWords')
        }
        else
        { 
            clearInterval(interval)
            navigate('/'+params.UserId+'/'+params.GameId+'/WaitingRoom')
        }
    }


    return (
        <div>
             <br/><br/><br/><br/>
             <h2>Pin Code : {params.GameId}</h2>
             <br/><br/>
             <h2>Waiting The Game To Start</h2>
             <br/>
             <div className="spinner-border text-primary" role="status">
             </div>

             <br/><br/>
        </div>
    );
}

export default BeforeTheGame;