import React from "react"
import { useAppSelector, useAppDispatch } from "../../redux-hooks" 
import { Cell } from "./Cell" 
import "../../common/styles/common.css" 
import "../styles/board.css"
import { v4 as uuidv4 } from "uuid" 
import { Modal } from "./Modal" 

export const Board = () => {
	const board = useAppSelector((state) => state.board)
	const dispatch = useAppDispatch()
	return (
		<div className = "board-container">
			<table>
				<thead>
					<tr>
						{ 
							board.statusesToDisplay.map((id) => {
								return (<th key = {id}>{board.statuses.find((status) => status.id === id)?.name}</th>)
							}) 
						}
					</tr>
				</thead>
				<tbody>
					{board.board.map(row => {
						return (
							<tr key = {uuidv4()}>{row.map(cell => {
								return <td key = {cell.id}><Cell cell={cell}/></td>
							})}</tr>
						)
					})}
				</tbody>
			</table>
			{ board.showModal ? <Modal/> : null}
		</div>
	)	
}