import { createStore } from "redux"
import { configureStore } from "@reduxjs/toolkit" 
import { boardReducer } from "./kanban-board/slices/boardSlice" 
import { gameReducer } from "./tic-tac-toe/reducers/game" 

export const store = configureStore({
	reducer: {
		"game": gameReducer,
		"board": boardReducer,
	},
})

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


