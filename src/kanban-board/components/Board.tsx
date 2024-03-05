import React from "react"
import { useAppSelector, useAppDispatch } from "../../redux-hooks" 
import { 
	deleteAllTickets, 
	toggleShowModal, 
	setModalType, 
	setModalProps, 
	sortByPriority, 
	selectCurrentTicketId 
} from "../slices/boardSlice"
import { Ticket } from "./Ticket"
import "../../common/styles/common.css" 
import "../styles/board.css"
import { v4 as uuidv4 } from "uuid" 
import { Modal } from "./Modal" 
import type { Cell as CellType, Status, Ticket as TicketType } from "../types/common"
import { sortStatusByOrder } from "../helpers/functions" 

export const Board = () => {
	const board = useAppSelector((state) => state.board)
	const dispatch = useAppDispatch()
	const boardStyle = {
		"display": "grid",	
		"gridTemplateColumns": `repeat(${board.statusesToDisplay.length}, auto)`,
		"gridGap": "8px",
		"width": "100%"
}
	return (
		<div className = "board-container">
			<div className = "btn-row">
				<button onClick = {() => {
					dispatch(toggleShowModal(true))
					dispatch(setModalType("TICKET_FORM"))
				}} className = "btn">Add Ticket</button>
				<button onClick = {() => {
					dispatch(toggleShowModal(true))
					dispatch(setModalType("STATUS_FORM"))
				}} className = "btn">Edit Statuses</button>
				<button onClick = {() => dispatch(sortByPriority({sortOrder: 1}))} className = "btn">Sort By Priority</button>
				<button onClick = {() => dispatch(deleteAllTickets())} className = "btn alert">Delete All Tickets</button>
			</div>
			<div style = {boardStyle}>
				{[...board.statuses].sort(sortStatusByOrder).map((status: Status) => {
					if (board.statusesToDisplay.includes(status.id)){
						return (<div key = {status.id} className = "grid-col">
							<div>
								<p>{board.statuses.find((s: Status) => s.id === status.id)?.name}</p>
								{board.newBoard[status.id].map((ticket: TicketType) => {
									return (
										<div 
											key = {ticket.id} 
											onClick = {() => {
												dispatch(toggleShowModal(true))
												dispatch(setModalType("TICKET_FORM"))
												dispatch(selectCurrentTicketId(ticket.id))
											}}
											className = "cell">
											<Ticket 
												ticket = {ticket}
											/>
										</div>
									)
								})}
							</div>
						</div>)
					}
				})}
			</div>
			<Modal/>
		</div>
	)	
}