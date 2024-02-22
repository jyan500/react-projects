import { checkGameState, checkFullBoard } from "../utils/utils"
import { createSlice } from "@reduxjs/toolkit" 

interface BoardState {
	width: number
	height: number
	numPlayers: number
	currentTurn: number
	board: Array<Array<string>>
	markers: Record<string, any>
	result: string
	winningCells: boolean | number[][]
}

const initialState: BoardState = {
	width: 3,
	height: 3,
	numPlayers: 2,
	currentTurn: 1,
	board: [["*", "*", "*"], ["*", "*", "*"], ["*", "*", "*"]],
	markers: {1: "O", 2: "X"},
	result: "",
	winningCells: []
}

export const gameReducer = (state = initialState, action: any) => {
	switch (action.type){
		case "FILL_CELL": {
			const { value, rowIndex: i, colIndex: j} = action.payload
			return {
				...state,
				// update the value at i,j without mutating state
				board: state.board.map((row, rowIndex) => {
					if (rowIndex === i){
						return row.map((cell, colIndex) => {
							if (colIndex === j){
								return value
							}
							return cell
						})	
					}
					return row
				})
			}
		}
		case "SWITCH_ACTION": {
			return {
				...state,
				currentTurn: state.currentTurn === 1 ? 2 : 1
			}
		}
		case "CHECK_GAME_STATE": {
			const { value, rowIndex: i, colIndex: j } = action.payload
			const [isVictory, winningCells] = checkGameState(state.board, state.width, state.height, i, j, value)
			// if there's no winner, and the board is full, this is a tie
			if (!isVictory){
				if (checkFullBoard(state.board, state.width, state.height)){
					return {
						...state,
						result: "Tie"
					}	
				}
			}
			else {
				return {
					...state,
					winningCells: winningCells,
					result: state.currentTurn === 1 ? "Player 1 Wins" : "Player 2 Wins"
				}
			}
			return state
		}
		case "RESET_BOARD": {
			return {
				...state,
				currentTurn: 1,
				result: "",
				winningCells: [],
				board: [["*", "*", "*"], ["*", "*", "*"], ["*", "*", "*"]],
			}
		}
	}
	return state
}

