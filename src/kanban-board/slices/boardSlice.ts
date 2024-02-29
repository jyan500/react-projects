import { createSlice, current } from "@reduxjs/toolkit"
import { createNewRow, setupInitialBoard, prioritySort } from "../helpers/functions" 
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import type { Cell, Board, Priority, Status, Ticket } from "../types/common" 

interface BoardState {
	board: Cell[][]
	numRows: number
	numCols: number
	statuses: Array<Status>
	statusesToDisplay: Array<string>
	priorityList: Array<Priority>
	showModal: boolean
	currentCell: Cell | null
	tickets: Array<Ticket>
}

const initialState: BoardState = {
	board: setupInitialBoard(4, 4),
	numCols: 4,
	numRows: 4,
	statusesToDisplay: ["1","2","3","4"],
	statuses: [
		{id: "1", name: "To-Do"}, 
		{id: "2", name: "In Progress"}, 
		{id: "3", name: "Code Complete"},
		{id: "4", name: "On Test"},
		{id: "5", name: "Staging"},
		{id: "6", name: "Released"},
		{id: "7", name: "Closed"},
	],
	priorityList: [
		{id: "1", name: "High", order: 1},
		{id: "2", name: "Medium", order: 2},
		{id: "3", name: "Low", order: 3},
	],
	tickets: [],
	showModal: false,
	currentCell: null
}

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		toggleShowModal(state, action: PayloadAction<boolean>){
			state.showModal = action.payload
		},
		selectCurrentCell(state, action: PayloadAction<Cell | null>){
			console.log(action.payload)
			state.currentCell = action.payload
		},
		addTicketToBoard(state, action: PayloadAction<Ticket>){
			const { 
				board, 
				numCols,
				numRows, 
				statuses, 
				statusesToDisplay, tickets 
			} = state
			tickets.push(action.payload)
			// all tickets start as to-do, and should be added in the to-do column
			// if it exists
			const status = statuses.find(status => status.id === action.payload.ticketStatus.id)
			if (status){
				const statusIndex = statusesToDisplay.indexOf(status.id)
				// find the first available row in the todo column
				let found = false
				for (let i = 0; i < numRows; ++i){
					if (!board[i][statusIndex].ticket){
						found = true
						board[i][statusIndex].ticket = action.payload
						break
					}
				}
				// if row is not found, add a new row
				if (!found){
					board.push(createNewRow(numRows, numCols))
					// add the ticket to the new row
					board[numRows][statusIndex].ticket = action.payload
					// increase the number of rows 
					++state.numRows
				}
			}

		},
		editTicket(state, action: PayloadAction<Ticket>){
			const { board, numCols, numRows, statuses, statusesToDisplay } = state
			// edit the ticket within the tickets list
			const colNum = state.currentCell?.colNum
			const rowNum = state.currentCell?.rowNum
			let ticketIndex = state.tickets.findIndex((ticket) => action.payload.id === ticket.id)
			// if the status is different than before
			console.log("rowNum: ", rowNum)
			console.log("colNum: ", colNum)
			if (action.payload.ticketStatus.id !== state.tickets[ticketIndex].ticketStatus.id){
				// find the column that the new status belongs to	
				const newStatus = statuses.find(status => status.id === action.payload.ticketStatus.id)	
				if (newStatus){
					const newStatusIndex = statusesToDisplay.indexOf(newStatus.id)
					let found = false
					for (let i = 0; i < numRows; ++i){
						if (!board[i][newStatusIndex].ticket){
							console.log("i, index: ", i, newStatusIndex)
							found = true 
							board[i][newStatusIndex].ticket = action.payload
							break
						}
					}
					if (!found){
						board.push(createNewRow(numRows, numCols))
						board[numRows][newStatusIndex].ticket = action.payload
						++state.numRows
					}
					// remove the ticket from the currently selected cell 
					if (rowNum != null && colNum != null){
						board[rowNum][colNum].ticket = null
						// shift the cells from each row below the selected Cell upwards
						for (let i = rowNum+1; i < numRows; ++i){
							if (board[i][colNum].ticket){
								let ticketCopy = {...board[i][colNum].ticket} as Ticket
								board[i-1][colNum].ticket = ticketCopy 
							}
							else {
								board[i-1][colNum].ticket = null
							}
						}
					}

				}
			}
			else {
				if (rowNum != null && colNum != null){
					board[rowNum][colNum].ticket = action.payload	
				}
			}
			// edit the ticket within the ticket list
			state.tickets[ticketIndex] = action.payload
		},
		/*
		Sort by columns,
		1) either by all columns if no status Id is provided, OR 
		by a specific column
		Within each column, specify 1 to sort by highest to lowest priority
		or 0 for lowest to highest priority
		*/
		sortByPriority(state, action: PayloadAction<{statusId?: string, sortOrder: number}>){
			const {board, numCols, numRows, statuses, statusesToDisplay} = state 
			const status = statuses.find(status => status.id === action.payload.statusId)	
			if (status){
				const statusIndex = statusesToDisplay.indexOf(status.id)
				let cells: Array<Cell> = []
				for (let i = 0; i < numRows; ++i){
					const cell = {...board[i][statusIndex]}
					if (cell.ticket){
						cells.push(cell)
					}
				}
				let sortedCells = action.payload.sortOrder === 1 ? prioritySort(cells) : prioritySort(cells).reverse()
				for (let k = 0; k < numRows; ++k){
					board[k][statusIndex].ticket = k < sortedCells.length ? sortedCells[k].ticket : null
				}
			}
			else {
				// sort every column on the board by each cell's priority
				for (let i = 0; i < numCols; ++i){
					let cells: Array<Cell> = []
					for (let j = 0; j < numRows; ++j){
						// need to make a copy instead of reference to avoid
						// the sortedCells from changing after mutating the array
						let cell = {...board[j][i]}
						if (cell.ticket){
							cells.push(cell)
						}
					}
					let sortedCells = action.payload.sortOrder === 1 ? prioritySort(cells) : prioritySort(cells).reverse()
					let col: Cell[] = []
					// starting from 0, 0, 0, 1, etc 
					// reset the ticket values for each cell to be the sorted order
					for (let k = 0; k < numRows; ++k){
						board[k][i].ticket = k < sortedCells.length ? sortedCells[k].ticket : null
					}
				}
			}
		},
		deleteAllTickets(state){
			const {board, numRows, numCols} = state
			// set null to all tickets on the board
			for (let i = 0; i < numRows; ++i){
				for (let j = 0; j < numCols; ++j){
					board[i][j].ticket = null
				}
			}
			// delete all tickets in the ticket list
			state.tickets = []
		}
	}
})

export const { addTicketToBoard, deleteAllTickets, editTicket, selectCurrentCell, sortByPriority, toggleShowModal } = boardSlice.actions
export const boardReducer = boardSlice.reducer 