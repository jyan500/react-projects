import { inBounds, checkGameState, checkFullBoard } from "../utils" 

describe("checkGameState", () => {
	it("returns true if there are multiple markers in a row", () => {
		let board = [
			["O", "X", "X"], ["*", "O", "*"], ["X", "X", "O"]
		]
		let i = 0
		let j = 0
		let marker = "O"
		let width = 3
		let height = 3
		var [isVictory, winningCells] = checkGameState(board, width, height, i, j, marker)
		expect(isVictory).toEqual(true)
		expect(winningCells).toEqual(expect.arrayContaining([
			[0, 0], [1, 1], [2, 2]
		]))

		board = [
			["O", "O", "O"], ["X", "X", "O"], ["*", "*", "*"]
		]
		i = 0
		j = 1
		marker = "O"
	    var [isVictory, winningCells] = checkGameState(board, width, height, i, j, marker)
		expect(isVictory).toEqual(true)
		expect(winningCells).toEqual(expect.arrayContaining([
			[0, 0], [0, 1], [0, 2]
		]))

	})	
	it("returns false if multiple markers are not in a row", () => {
		let board = [
			["X", "O", "O"], ["O", "O", "X"], ["O", "X", "O"]
		]
		let i = 0
		let j = 0
		let marker = "X"
		let width = 3
		let height = 3
		expect(checkGameState(board, width, height, i, j, marker)).toEqual([false, []])

		board = [
			["X", "O", "O"], ["O", "O", "X"], ["X", "X", "O"]
		]
		i = 1 
		j = 1 
		marker = "O"
		expect(checkGameState(board, width, height, i, j, marker)).toEqual([false, []])

		board = [
			["*", "O", "*"],
			["*", "X", "O"],
			["*", "*", "*"]
		]
		marker = "O"
		i = 1
		j = 2
		expect(checkGameState(board, width, height, i, j, marker)).toEqual([false, []])
	})
})

describe("inBounds", () => {
	it("checks that i, j is in bounds", () => {
		let i = 2
		let j = 2
		let width = 3
		let height = 3
		expect(inBounds(width, height, i, j)).toEqual(true)
	})
})

describe("checkFullBoard", () => {
	it("returns true if the board is full", () => {
		let board = [
			["X", "O", "O"], ["O", "O", "X"], ["O", "X", "O"]
		]
		let height = 3
		let width = 3
		expect(checkFullBoard(board, width, height)).toEqual(true)

		board = [
			["X", "O", "O"], ["O", "O", "X"], ["O", "*", "*"]
		]
		expect(checkFullBoard(board, width, height)).toEqual(false)
	})
})