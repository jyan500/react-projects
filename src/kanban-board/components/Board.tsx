import React from "react"
import { useAppSelector, useAppDispatch } from "../../redux-hooks" 
import { decrement, increment } from "../slices/boardSlice"
import "../styles/common.css" 
import "../styles/board.css"

export const Board = () => {
	const count = useAppSelector((state) => state.board.value)
	const dispatch = useAppDispatch()
	return (
		<div>
			<p className = "">{count}</p>
			<button className = "btn" onClick={() => dispatch(increment())}>Increment</button>
			<button className = "btn" onClick={() => dispatch(decrement())}>Decrement</button>
		</div>
	)	
}