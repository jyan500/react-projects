import { inBounds, checkGameState } from "../utils" 

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
		expect(checkGameState(board, width, height, i, j, marker)).toEqual(true)

		board = [
			["O", "O", "O"], ["X", "X", "O"], ["*", "*", "*"]
		]
		i = 0
		j = 1
		marker = "O"
		expect(checkGameState(board, width, height, i, j, marker)).toEqual(true)

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
		expect(checkGameState(board, width, height, i, j, marker)).toEqual(false)

		board = [
			["X", "O", "O"], ["O", "O", "X"], ["X", "X", "O"]
		]
		i = 1 
		j = 1 
		marker = "O"
		expect(checkGameState(board, width, height, i, j, marker)).toEqual(false)
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