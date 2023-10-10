import { combineReducers } from "redux"
import { gameReducer } from "../tic-tac-toe/reducers/game"

const rootReducer = combineReducers({
	game: gameReducer,
	// add more reducers here
})

export default rootReducer