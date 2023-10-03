import React from 'react';
import './App.css';
import { CountDown } from "./countdown-timer/components/CountDown"
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <p>My React Projects</p>
        <Link to = {"/countdown"}>Countdown Timer</Link>
        <Routes>
          <Route path = "/countdown" element={<CountDown/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
