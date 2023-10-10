import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Cell from "./Cell"
import { iResetBoardAction, resetBoard } from "../actions/actions"
import TurnDisplay from "./TurnDisplay"

type StateProps = {
	width: number
	height: number
	board: Array<Array<string>>
	winningCells: Array<Array<number>>
}

type DispatchProps = {
	resetBoard: () => iResetBoardAction
}

type Props = StateProps & DispatchProps

const Board: React.FC<Props> = (props) => {
	return (
		<div>
			<Link to = "/">Return Home</Link>
			<TurnDisplay/>
			<button onClick = {props.resetBoard}>Reset Game</button>
			<div className="flex justify-center p-8">
				{
					props.board.map((row, rowIndex) => (
						<div key = {"r-" + rowIndex}>
							{row.map((cell, colIndex) => {
								let bgColor = "bg-gray-100"
								if (props.winningCells.length && props.winningCells.find((cell) => cell[0] === rowIndex && cell[1] === colIndex)){
									bgColor = "bg-green-300"
								}
								return (
									<Cell 
										key = {"c-" + colIndex} 
										className={`${bgColor} ${colIndex !== props.height - 1 ? "border-b-4" : ""} ${rowIndex !== props.width - 1 ? "border-r-4" : ""} w-40 h-40 flex justify-center items-center`}
										value = {cell !== "*" ? cell : ""}
										rowIndex = {rowIndex}
										colIndex = {colIndex} 
									/>)
							})}
						</div>
					))	
				}	
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	width: state.game.width,
	height: state.game.height,
	board: state.game.board,
	winningCells: state.game.winningCells
})

const mapDispatchToProps = {
	resetBoard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)


