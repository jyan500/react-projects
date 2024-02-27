import { createSlice } from "@reduxjs/toolkit"
import { createNewRow, setupInitialBoard } from "../helpers/functions" 
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
			const toDo = statuses.find(status => status.name === "To-Do")
			if (toDo){
				const toDoIndex = statusesToDisplay.indexOf(toDo.id)
				// find the first available row in the todo column
				let found = false
				for (let i = 0; i < numRows; ++i){
					if (!board[i][toDoIndex].ticket){
						found = true
						board[i][toDoIndex].ticket = action.payload
						break
					}
				}
				// if row is not found, add a new row
				if (!found){
					board.push(createNewRow(numRows, numCols))
					// add the ticket to the new row
					board[numRows][toDoIndex].ticket = action.payload
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
						found = true 
						board[i][newStatusIndex].ticket = action.payload
						break
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
		}
	}
})

export const { addTicketToBoard, editTicket, selectCurrentCell, toggleShowModal } = boardSlice.actions
export const boardReducer = boardSlice.reducer 