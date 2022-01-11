import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Play from '../Play';

function Router() {
    return (
        <div>
            <Routes>
            <Route path="/:UserName/:UserId/:GameId" exact element={<Play/>}/>
            </Routes>
        </div>
    );
}

export default Router;