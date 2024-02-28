import { createSlice } from "@reduxjs/toolkit"
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
			// if the status is different than before
			let ticketIndex = state.tickets.findIndex((ticket) => action.payload.id === ticket.id)
			if (action.payload.ticketStatus.id !== state.tickets[ticketIndex].ticketStatus.id){
				// find the column that the new status belongs to	
				const newStatus = statuses.find(status => status.id === action.payload.ticketStatus.id)	
				if (newStatus){
					const newStatusIndex = statusesToDisplay.indexOf(newStatus.id)
					let found = false
					for (let i = 0; i < numRows; ++i){
						if (!board[i][newStatusIndex].ticket){
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
					const cell = board[i][statusIndex]
					if (cell.ticket){
						cells.push(cell)
					}
				}
				console.log("cells: ", cells)
				let sortedCells = action.payload.sortOrder === 1 ? prioritySort(cells) : prioritySort(cells).reverse()
			}
			else {
				// sort every column on the board by each cell's priority
				for (let i = 0; i < numCols; ++i){
					let cells: Array<Cell> = []
					for (let j = 0; j < numRows; ++j){
						console.log(board[j])
						let cell = board[j][i]
						if (cell.ticket){
							cells.push(cell)
						}
					}
					let sortedCells = action.payload.sortOrder === 1 ? prioritySort(cells) : prioritySort(cells).reverse()
				}
			}
		}
	}
})

export const { addTicketToBoard, editTicket, selectCurrentCell, sortByPriority, toggleShowModal } = boardSlice.actions
export const boardReducer = boardSlice.reducer 