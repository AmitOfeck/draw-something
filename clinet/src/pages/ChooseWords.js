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


    return (
        <div>
            <h2>Choose Words</h2>
            
            <div class="input-group mb-3">
                <button class="btn btn-success" type="button">{words.Easy}</button>
                <button class="btn btn-warning" type="button">{words.Medium}</button>
                <button class="btn btn-danger" type="button">{words.Hard}</button>
           </div>

           <button type="button" class="btn btn-outline-primary" onClick={() => setWords(randomWords.randomWordsFunction()) }>Reset Words</button>

        </div>
    );
}

export default ChooseWords;