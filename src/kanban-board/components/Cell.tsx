import React from "react"
import type { Cell as CellType, Ticket as TicketType } from "../types/common"
import { selectCurrentCell, setModalType, toggleShowModal } from "../slices/boardSlice" 
import { useAppDispatch } from "../../redux-hooks" 
import { Ticket } from "./Ticket" 
import "../styles/cell.css" 

type PropType = {
	cell: CellType
}

export const Cell = ({cell}: PropType) => {
	const dispatch = useAppDispatch()
	return (
		<>
			{cell.ticket ? <div
				className = "cell"
				onClick = {() => {
				dispatch(toggleShowModal(true))
				dispatch(setModalType("TICKET_FORM"))
				dispatch(selectCurrentCell(cell))
			}}><Ticket ticket={cell.ticket}/></div> : <div className = "cell"></div>}
		</>
	)
}