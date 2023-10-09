const initialState = {
	width: 3,
	height: 3,
	numPlayers: 2,
	currentTurn: 1,
	board: [["*", "*", "*"], ["*", "*", "*"], ["*", "*", "*"]],
	markers: {1: "O", 2: "X"}
}

export const gameReducer = (state = initialState, action: any) => {
	switch (action.type){
		case "FILL_CELL":
			const { value, rowIndex: i, colIndex: j} = action.payload
			return {
				...state,
				// update the value at i,j without mutating state
				board: state.board.map((row, rowIndex) => {
					if (rowIndex === i){
						return row.map((cell, colIndex) => {
							if (colIndex === j){
								return value
							}
							return cell
						})	
					}
					return row
				})
			}
		case "SWITCH_ACTION":
			return {
				...state,
				currentTurn: state.currentTurn === 1 ? 2 : 1
			}

		case "RESET_BOARD":
			return {
				...state,
				board: [["*", "*", "*"], ["*", "*", "*"], ["*", "*", "*"]],
			}

	}
	return state
}

