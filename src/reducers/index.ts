import { combineReducers } from "redux"
import counterReducer from "../tic-tac-toe/reducers/counter"
import { gameReducer } from "../tic-tac-toe/reducers/game"

const rootReducer = combineReducers({
	counter: counterReducer,
	game: gameReducer,
	// add more reducers here
})

export default rootReducer