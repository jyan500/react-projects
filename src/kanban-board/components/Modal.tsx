import React, {ReactNode} from "react"
import { IoMdClose } from "react-icons/io";
import "../../common/styles/modal.css"
import { toggleShowModal, selectCurrentCell, setModalType } from "../slices/boardSlice"
import { modalTypes } from "../helpers/constants" 
import { useAppDispatch, useAppSelector } from "../../redux-hooks" 

export const Modal = () => {
	const dispatch = useAppDispatch()
	const board = useAppSelector((state) => state.board)
	const ModalContent = modalTypes[board.currentModalType as keyof typeof modalTypes] 
	return (
		<div className = {`overlay ${board.showModal ? "visible": "hidden"}`}>
			<div className = "modal-container">
				<button onClick={
					() => {
						dispatch(toggleShowModal(false))
						dispatch(setModalType("TICKET_FORM"))
						dispatch(selectCurrentCell(null))
					}
				}
				>
					<IoMdClose className = "close-button"/></button>
				<div className = "modal">
					<div className = "modal-content">
						{
							ModalContent ? <ModalContent/> : null
						}
					</div>
				</div>
			</div>	
		</div>
	)	
}