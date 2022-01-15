import React from 'react';
import {Routes, Route} from 'react-router-dom'
import BeforeTheGame from '../BeforeTheGame';
import ChooseWords from '../ChooseWords';
import Guess from '../Guess';
import Play from '../Play';
import WaitingRoom from '../WaitingRoom';
import Welcome from '../Welcome';
import Bar from '../Bar';
import Records from '../Records';


function Router() {
    return (
        <div>
            <Routes>
            <Route path="/" exact element={<Welcome/>}/>
            <Route path="/Records" exact element={<Records/>}/>
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