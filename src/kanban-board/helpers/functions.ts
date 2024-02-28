import type { Cell, Ticket } from "../types/common"
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

// sort an array of cells (that contain tickets) by 
// the priority of the ticket
export const prioritySort = (cells: Array<Cell>) => {
	const sortKey = (a: Cell, b: Cell) => {
		if (a.ticket && b.ticket){
			if (a.ticket.priority.order < b.ticket.priority.order){
				return -1
			}
			else if (a.ticket.priority.order > b.ticket.priority.order){
				return 1
			}
			else {
				return 0
			}
		}
		return 0
	}	
	return cells.sort(sortKey)
}