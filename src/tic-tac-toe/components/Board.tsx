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
								return (
									<Cell 
										key = {"c-" + colIndex} 
										className={`${colIndex !== props.height - 1 ? "border-b-4" : ""} ${rowIndex !== props.width - 1 ? "border-r-4" : ""} w-40 h-40 flex justify-center items-center`}
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
	board: state.game.board
})

const mapDispatchToProps = {
	resetBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)


