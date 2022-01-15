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

    const [records , setRecords] = useState([])

    useEffect(async () => {
       let answer = await Utils.getRecords()
       setRecords(answer)
    },[])

    let body = records.map(record => {
        return (<tr key={record._id}>
        <th scope="row">1</th>
        <td>{record.Users[0].UserName}</td>
        <td>{record.Users[1].UserName}</td>
        <td>{record.Score}</td>
        <td>{Math.floor(record.Rating)}</td>
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
                    <th scope="col">Poins Per Sec</th>
                </tr>
              </thead>
             <tbody>
                {body}
             </tbody>
           </table>
        </div>
    );
}

export default Records;