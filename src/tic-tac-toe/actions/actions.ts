import { CellPayload } from "../types/common" 

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

export type iCheckGameStateAction = {
	type: "CHECK_GAME_STATE",
	payload: Record<string, any>
}

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

export const checkGameState = (payload: CellPayload): iCheckGameStateAction => ({
	type: "CHECK_GAME_STATE",
	payload
})
