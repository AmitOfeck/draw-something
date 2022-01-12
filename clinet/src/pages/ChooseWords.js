import React, { useEffect, useState } from 'react';
import { useNavigate , useParams } from 'react-router-dom'
var randomWords = require('../API/randomWords'); 


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

    function moveToDraw(word) {
      console.log(word)
    }


    return (
        <div>
            <h2>Choose Words</h2>
            
            <div className="input-group mb-3">
                <button className="btn btn-success" value={words.Easy} type="button" onClick={(e) => moveToDraw(e.target.value) }>{words.Easy}</button>
                <button className="btn btn-warning" value={words.Medium} type="button" onClick={(e) => moveToDraw(e.target.value) }>{words.Medium}</button>
                <button className="btn btn-danger"  value={words.Hard} type="button" onClick={(e) => moveToDraw(e.target.value) }>{words.Hard}</button>
           </div>

           <button type="button" className="btn btn-outline-primary" onClick={() => setWords(randomWords.randomWordsFunction()) }>Reset Words</button>

        </div>
    );
}

export default ChooseWords;