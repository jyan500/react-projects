import React from 'react';
import './App.css';
import { CountDown } from "./countdown-timer/components/CountDown"
import Board from "./tic-tac-toe/components/Board"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./home/Home" 

function App() {
  return (
    <div className="App">
      <Router>
        <div className = "p-8">
          <h1 className="text-6xl">My React Projects</h1>
          <div className = "p-16">
            <Routes>
              <Route path = "/" element={<Home/>}></Route>
              <Route path = "/countdown" element={<CountDown/>}></Route>
              <Route path = "/tic-tac-toe" element={<Board/>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
