import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import BeforeTheGame from '../BeforeTheGame';
import ChooseWords from '../ChooseWords';
import Guess from '../Guess';
import Play from '../Play';
import WaitingRoom from '../WaitingRoom';
import Welcome from '../Welcome';
import Bar from '../Bar';
import Records from '../Records';



function Router({ ws }) {
    return (
        <div>
            <Routes>
            <Route path="/" exact element={<Welcome/>}/>
            <Route path="/Records" exact element={<Records/>}/>
            <Route path="/:UserId/:GameId/BeforeTheGame" exact element={<BeforeTheGame ws = {ws}/>}/>
            <Route path="/:UserId/:GameId/Play" exact element={<Play ws = {ws}/>}/>
            <Route path="/:UserId/:GameId/Guess" exact element={<Guess ws = {ws}/>}/>
            <Route path="/:UserId/:GameId/ChooseWords" exact element={<ChooseWords ws = {ws}/>}/>
            <Route path="/:UserId/:GameId/WaitingRoom" exact element={<WaitingRoom ws = {ws}/>}/>
            </Routes>
        </div>
    );
}

export default Router;