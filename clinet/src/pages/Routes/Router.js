import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Play from '../Play';
import TurnRouter from '../TurnRouter';

function Router() {
    return (
        <div>
            <Routes>
            <Route path="/:UserName/:UserId/:GameId" exact element={<TurnRouter/>}/>
            </Routes>
        </div>
    );
}

export default Router;