import React from 'react';

function WaitingRoom(props) {
    return (
        <div>
            <br/><br/><br/><br/>
            <h1>Waiting Room...</h1>
            <br/>
            <div className="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default WaitingRoom;