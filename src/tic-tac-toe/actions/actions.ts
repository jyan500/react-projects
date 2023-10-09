import { CellPayload } from "../types/common" 

export type iCounterAction = 
	{ type: "INCREMENT"} | { type: "DECREMENT"}

export type iFillCellAction = {
	type: "FILL_CELL"
	payload: Record<string, any>
}

export type iSwitchPlayerAction = {
	type: "SWITCH_ACTION"
}

export type iResetBoardAction = {
	type: "RESET_BOARD"
}

export const increment = (): iCounterAction => ({
	type: "INCREMENT"
})

export const decrement = (): iCounterAction => ({
	type: "DECREMENT"
})

export const fillCell = (payload: CellPayload): iFillCellAction => ({
	type: "FILL_CELL",
	payload: payload	
})

export const switchPlayer = (): iSwitchPlayerAction => ({
	type: "SWITCH_ACTION",
})

export const resetBoard = (): iResetBoardAction => ({
	type: "RESET_BOARD",
})
