import React from "react"
import { IoMdClose } from "react-icons/io";
import "../../common/styles/modal.css"
import { toggleShowModal, selectCurrentCell } from "../slices/boardSlice"
import { TicketForm } from "./TicketForm" 
import { useAppDispatch, useAppSelector } from "../../redux-hooks" 

export const Modal = () => {
	const dispatch = useAppDispatch()
	const board = useAppSelector((state) => state.board)
	return (
		<div className = {`overlay ${board.showModal ? "visible": "hidden"}`}>
			<div className = "modal-container">
				<button onClick={
					() => {
						dispatch(toggleShowModal(false))
						dispatch(selectCurrentCell(null))
					}
				}
				>
					<IoMdClose className = "close-button"/></button>
				<div className = "modal">
					<div className = "modal-content">
						<TicketForm/>
					</div>
				</div>
			</div>	
		</div>
	)	
}