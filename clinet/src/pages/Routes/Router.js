import React from 'react';
import {Routes, Route} from 'react-router-dom'
import ChooseWords from '../ChooseWords';
import Guess from '../Guess';
import Play from '../Play';
import TurnRouter from '../TurnRouter';
import WaitingRoom from '../WaitingRoom';

function Router() {
    return (
        <div>
            <Routes>
            <Route path="/:UserId/:GameId/Play" exact element={<Play/>}/>
            <Route path="/:UserId/:GameId/Guess" exact element={<Guess/>}/>
            <Route path="/:UserId/:GameId/ChooseWords" exact element={<ChooseWords/>}/>
            <Route path="/:UserId/:GameId/WaitingRoom" exact element={<WaitingRoom/>}/>
            </Routes>
        </div>
    );
}

export default Router;