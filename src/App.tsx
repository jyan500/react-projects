import React from 'react';
import './App.css';
import { CountDown } from "./countdown-timer/components/CountDown"
import Board from "./tic-tac-toe/components/Board"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./home/Home" 
import { Notes } from "./notes/components/Notes" 
import { Gallery } from "./gallery/components/Gallery"
import { Weather } from "./weather/components/Weather"
import { Shapes } from "./shapes/Shapes" 
import { Board as KanbanBoard } from "./kanban-board/components/Board" 

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
              <Route path = "/notes" element={<Notes/>}></Route>
              <Route path = "/gallery" element = {<Gallery/>}></Route>
              <Route path = "/weather" element = {<Weather/>}></Route>
              <Route path = "/shapes" element = {<Shapes/>}></Route>
              <Route path = "/kanban-board" element ={<KanbanBoard/>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
