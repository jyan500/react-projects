import React from "react"
import { Link } from "react-router-dom"

export const Home = () => {
	return (
		<div className = "flex items-center justify-center p-8">
			<Link className = "p-2" to = "/countdown">Countdown Timer</Link>	
			<Link className = "p-2" to = "/tic-tac-toe">Tic Tac Toe</Link>	
			<Link className = "p-2" to = "/notes">Notes</Link>	
			<Link className = "p-2" to = "/gallery">Gallery</Link>	
			<Link className = "p-2" to = "/weather">Weather</Link>	
			<Link className = "p-2" to = "/shapes">Shapes</Link>	
			<Link className = "p-2" to = "/kanban-board">Kanban Board</Link>	
		</div>
	)
}