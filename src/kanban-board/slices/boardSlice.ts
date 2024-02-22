import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

interface BoardState {
	value: number
}

const initialState: BoardState = {
	value : 0
}

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload	
		}
	}
})

export const { increment, decrement, incrementByAmount } = boardSlice.actions
export const boardReducer = boardSlice.reducer 