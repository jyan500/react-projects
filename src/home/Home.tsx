import React from "react"
import { Link } from "react-router-dom"

export const Home = () => {
	return (
		<div className = "flex items-center justify-center p-8">
			<Link to = "/countdown">Countdown Timer</Link>	
			<Link to = "/tic-tac-toe">Tic Tac Toe</Link>	
		</div>
	)
}