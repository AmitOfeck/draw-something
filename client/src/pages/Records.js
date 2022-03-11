import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { useNavigate , useParams } from 'react-router-dom'
import Utils from './Utils/Utils';
import '../App.css';
import Bar from './Bar';


function Records(props) {
    const params = useParams();
    const navigate = useNavigate();

    const ws = new WebSocket("ws://localhost:8080");

    ws.addEventListener("open" , () => {
      ws.send("Hey, how's it going?")
    });

    ws.addEventListener("message" , e => {
      console.log('getting message', e)
    });

    const [records , setRecords] = useState([])

    useEffect(async () => {
       let answer = await Utils.getRecords()
       setRecords(answer)
    },[])

    let body = records.map((record, index) => {
        return (<tr key={record._id}>
        <th scope="row">{index + 1}</th>
        <td>{record.Users[0]?.UserName}</td>
        <td>{record.Users[1]?.UserName}</td>
        <td>{record.Score}</td>
        <td>{Math.ceil(record.Rating)}</td>
        </tr>)
    })

    return (
        <div>
            <br/>
            <h2>Records</h2>
  
            <br/> <br/>

            <table className="table">
              <thead>
                 <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Player 1</th>
                    <th scope="col">Player 2</th>
                    <th scope="col">Score</th>
                    <th scope="col">Rating</th>
                </tr>
              </thead>
             <tbody>
                {body}
             </tbody>
           </table>
           <br/>
           <button type="button" className="btn btn-outline-secondary" onClick={ () => navigate('/')}>Home</button>
        </div>
    );
}

export default Records;