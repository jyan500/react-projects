import React from "react"
import { useAppSelector, useAppDispatch } from "../../redux-hooks" 
import { deleteAllTickets, toggleShowModal, sortByPriority } from "../slices/boardSlice"
import { Cell } from "./Cell" 
import "../../common/styles/common.css" 
import "../styles/board.css"
import { v4 as uuidv4 } from "uuid" 
import { Modal } from "./Modal" 
import type { Cell as CellType, Status } from "../types/common"

export const Board = () => {
	const board = useAppSelector((state) => state.board)
	const dispatch = useAppDispatch()
	return (
		<div className = "board-container">
			<div className = "btn-row">
				<button onClick = {() => dispatch(toggleShowModal(true))} className = "btn">Add Ticket</button>
				<button onClick = {() => dispatch(sortByPriority({sortOrder: 1}))} className = "btn">Sort By Priority</button>
				<button onClick = {() => dispatch(deleteAllTickets())} className = "btn alert">Delete All Tickets</button>
			</div>
			<table>
				<thead>
					<tr>
						{ 
							board.statusesToDisplay.map((id: string) => {
								return (<th key = {id}>{board.statuses.find((status: Status) => status.id === id)?.name}</th>)
							}) 
						}
					</tr>
				</thead>
				<tbody>
					{board.board.map((row: Array<CellType>) => {
						return (
							<tr key = {uuidv4()}>{row.map(cell => {
								return <td key = {cell.id}><Cell cell={cell}/></td>
							})}</tr>
						)
					})}
				</tbody>
			</table>
			<Modal/>
		</div>
	)	
}