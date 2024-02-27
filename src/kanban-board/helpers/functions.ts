import { Cell } from "../types/common"
import { v4 as uuidv4 } from "uuid"

export const setupInitialBoard = (numRows: number, numCols: number) => {	
	let board: Cell[][] = []	
	for (let i = 0; i < numRows; ++i){
		let row = []
		for (let j = 0; j < numCols; ++j){
			const cell: Cell = {
				id: uuidv4(), 
				rowNum: i, 
				colNum: j, 
				ticket: null
			}
			row.push(cell)
		}
		board.push(row)
	}
	return board
}

export const createNewRow = (rowNum: number, numCols: number) => {
	let row: Cell[] = []
	for (let i = 0; i < numCols; ++i){
		const cell: Cell = {
			id: uuidv4(),
			rowNum: rowNum,
			colNum: i, 
			ticket: null
		}	
		row.push(cell)
	}
	return row

}