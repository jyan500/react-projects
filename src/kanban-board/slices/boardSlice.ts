import { createSlice } from "@reduxjs/toolkit"
import { setupInitialBoard } from "../helpers/functions" 
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
			state.tickets.push(action.payload)
			// add ticket to the board
			const colNum = state.currentCell?.colNum
			const rowNum = state.currentCell?.rowNum
			if (rowNum != null && colNum != null){
				state.board[rowNum][colNum].ticket = action.payload
			}
		}
	}
})

export const { addTicketToBoard, selectCurrentCell, toggleShowModal } = boardSlice.actions
export const boardReducer = boardSlice.reducer 