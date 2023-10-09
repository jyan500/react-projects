/**
 * Check whether a given set of i, j are in bounds with the board 
 */ 
export const inBounds = (
	width: number, 
	height: number, 
	i: number, 
	j: number
) => {
	return 0 <= i && i < height && 0 <= j && j < width
}

/**
 * Given a cell, check in all 8 directions to see if there's
 * markers in a row that would indicate victory
 */
export const checkGameState = (
	board: Array<Array<string>>, 
	width: number, 
	height: number, 
	i: number, 
	j: number, 
	marker: string
) => {
	const directions = {"horizontal":[[0, 1], [0, -1]], "vertical": [[1, 0], [-1, 0]], "diagonal1": [[1, 1], [-1, -1]], "diagonal2": [[-1, 1], [1, -1]]}
	for (const key of Object.keys(directions)){
		let directionContainsMultiple = []
		for (const d of directions[key]){
			const [x, y] = d
			let newX = i
			let newY = j
			while (inBounds(width, height, newX, newY)) {
				newX = newX + x
				newY = newY + y
				if (inBounds(width, height, newX, newY)){
					directionContainsMultiple.push(board[newX][newY] === marker)
				}
			}
		}
		if (directionContainsMultiple.length && directionContainsMultiple.every((val) => val)){
			return true
		}
	}
	return false
}