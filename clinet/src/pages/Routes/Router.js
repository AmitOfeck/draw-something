import React from 'react';
import {Routes, Route} from 'react-router-dom'
import BeforeTheGame from '../BeforeTheGame';
import ChooseWords from '../ChooseWords';
import Guess from '../Guess';
import Play from '../Play';
import TurnRouter from '../TurnRouter';
import WaitingRoom from '../WaitingRoom';
import Welcome from '../Welcome';

function Router() {
    return (
        <div>
            <Routes>
            <Route path="/" exact element={<Welcome/>}/>
            <Route path="/:UserId/:GameId/BeforeTheGame" exact element={<BeforeTheGame/>}/>
            <Route path="/:UserId/:GameId/Play" exact element={<Play/>}/>
            <Route path="/:UserId/:GameId/Guess" exact element={<Guess/>}/>
            <Route path="/:UserId/:GameId/ChooseWords" exact element={<ChooseWords/>}/>
            <Route path="/:UserId/:GameId/WaitingRoom" exact element={<WaitingRoom/>}/>
            </Routes>
        </div>
    );
}

export default Router;