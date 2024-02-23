import React from "react"
import type { Cell as CellType, Ticket as TicketType } from "../types/common"
import { selectCurrentCell, toggleShowModal } from "../slices/boardSlice" 
import { useAppDispatch } from "../../redux-hooks" 
import { Ticket } from "./Ticket" 
import "../styles/cell.css" 

type PropType = {
	cell: CellType
}

export const Cell = ({cell}: PropType) => {
	const dispatch = useAppDispatch()
	return (
		<div>
			{cell.ticket ? <Ticket/> : <div className = "empty cell" onClick={() => {
				dispatch(toggleShowModal(true))
				dispatch(selectCurrentCell(cell))
			}}>
			</div>
			}
		</div>
	)
}