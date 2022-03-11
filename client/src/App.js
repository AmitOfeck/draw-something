import logo from './logo.svg';
import './App.css';
import Router from './pages/Routes/Router';
import React, { useEffect, useState } from 'react';

function App() {
  const ws = new WebSocket("ws://localhost:8080");
  async function connectToServer() {
      
      return new Promise((resolve, reject) => {
          const timer = setInterval(() => {
              if(ws.readyState === 1) {
                  clearInterval(timer)
                  resolve(ws);
              }
          }, 10);
      });
  }

  useEffect(async () => {
      await connectToServer();
  }, [])

  ws?.addEventListener("open" , () => {
  //   ws.send("Hey, how's it going?")
      console.log("open")
  });

  ws?.addEventListener("message" , e => {
    console.log('getting message', e)
  });

  ws?.addEventListener("close", () => {
      console.log('closing')
  })

  return (
    <div className="App">
       <Router ws = {ws}/>
    </div>
  );
}

export default App;
