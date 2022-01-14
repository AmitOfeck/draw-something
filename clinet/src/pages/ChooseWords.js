import React, { useEffect, useState } from 'react';
import { useNavigate , useParams } from 'react-router-dom'
import Utils from '../pages/Utils/Utils'
import '../App.css'
let randomWords = require('../API/randomWords'); 




function ChooseWords(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [words , setWords] = useState({
        Easy : "" ,
        Medium : "" ,
        Hard : ""
    })

    useEffect(async () => {
        setWords(randomWords.randomWordsFunction())
    } ,[])

    async function moveToDraw(word) {
      let obj = {word : word.innerText , points : word.value}
      let answer = await Utils.setNextStep(params.UserId , params.GameId  , obj)
      console.log("choose word --- play")
      navigate('/'+params.UserId+'/'+params.GameId+'/Play')
    }


    return (
        <div>
            <h2>Choose Words</h2>

            <div id="drawBoard">
                <div></div>
                <div className="input-group mb-3">
                   <button className="btn btn-success" value='1' type="button" onClick={(e) => moveToDraw(e.target) }>{words.Easy}</button>
                   <button className="btn btn-warning" value='3' type="button" onClick={(e) => moveToDraw(e.target) }>{words.Medium}</button>
                   <button className="btn btn-danger"  value='5' type="button" onClick={(e) => moveToDraw(e.target) }>{words.Hard}</button>
                </div>
                <div></div>
            </div>

           <button type="button" className="btn btn-outline-primary" onClick={() => setWords(randomWords.randomWordsFunction()) }>Reset Words</button>

        </div>
    );
}

export default ChooseWords;