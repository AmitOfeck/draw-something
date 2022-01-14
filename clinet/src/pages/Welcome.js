import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';
import pen from '../images/pen.jpeg'


function Welcome(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [input , setInput] = useState({
       GameId : 0
    })

    const [name , setName] = useState({
        UserName : ""
     })

     const createGame = async (name) => {
        if(name.UserName !== "")
        {
            let answer = await Utils.newGame(name)
            const UserId = answer.Users[0].UserId;
            const GameId = answer.GameId;
            navigate('/'+UserId+'/'+GameId+'/BeforeTheGame')
        }
        else{
            alert(`Missing Player Name`)
        }
     }

     const JoinGame = async (UserName , PinCode) => {
        if(name.UserName !== "" || input.GameId !== 0)
        {
            let obj = {UserName : UserName , GameId : PinCode}
            let answer = await Utils.joinGame(obj)
            const UserId = answer.Users[0].UserId;
            const GameId = answer.GameId;
            navigate('/'+UserId+'/'+GameId+'/BeforeTheGame')
        }
        else{
            alert(`Missing Player Name or Missing Pin Code`)
        }
     }

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
              <div className="container">
                <img src={pen} width="60" height="60" id="pen"/>
                <h2>Draw & Guess </h2>
                <div></div>
              </div>
            </nav>

            <br/>

            <div id="blue">
                <h3>Create Game</h3>

                <div id="white">
                <input className="form-control me-2" placeholder="Enter Your Name" aria-label="Search"
                onChange={(e) => {setName({UserName : e.target.value})} } />
                <button className="btn btn-outline-success" type="submit" onClick={() => createGame(name)} >Create Game</button>
                </div>
            </div>

            <br/><br/>

            <div id="blue">
                <h3>Join Game</h3>

                <div id="white">
                <input className="form-control me-2" placeholder="Enter Your Name" aria-label="Search"
                onChange={(e) => {setName({UserName : e.target.value})}  } />

                <input className="form-control me-2" placeholder="Pin Code" aria-label="Search"
                onChange={(e) => {setInput({GameId : e.target.value})}  } />
                <button className="btn btn-outline-success" type="submit" onClick={() => JoinGame(name.UserName , input.GameId)} >Join</button>
                </div>
            </div>
            
        </div>
    );
}

export default Welcome;