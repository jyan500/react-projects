import React, { useState, useEffect } from "react"
import "../../common/styles/common.css" 
import { useAppDispatch, useAppSelector } from "../../redux-hooks"
import { addTicketToBoard, selectCurrentCell, editTicket, toggleShowModal } from "../slices/boardSlice"
import { v4 as uuidv4 } from "uuid" 

export const TicketForm = () => {
	const dispatch = useAppDispatch()
	const board = useAppSelector((state) => state.board)
	let defaultForm = {
		id: "",
		ticketName: "",
		ticketDescription: "",
		priority: "",
		// default TODO
		ticketStatus: "1"
	}

	const [form, setForm] = useState(defaultForm)

	useEffect(() => {
		// initialize with current values if the ticket exists
		if (board.currentCell?.ticket){
			let ticket = board.currentCell.ticket
			setForm({
				...ticket,
				priority: ticket.priority.id,
				ticketStatus: ticket.ticketStatus.id
			})
		}
	}, [board.showModal])

	const onSubmit = () => {
		const status = board.statuses.find((status) => status.id === form.ticketStatus)
		const priority = board.priorityList.find((priority) => priority.id === form.priority)
		if (priority && status){
			if (form.id === ""){
				dispatch(addTicketToBoard({
					...form,
					id: uuidv4(),
					priority: priority,
					ticketStatus: status
				}))
			}
			else {
				dispatch(editTicket({...form, priority: priority, ticketStatus: status}))	
			}
			dispatch(toggleShowModal(false))
			dispatch(selectCurrentCell(null))
			setForm(defaultForm)
		}
	}
	return (
		<div className = "container">
			<form onSubmit = {(e) => {
				e.preventDefault()
				onSubmit()
			}}>
				<div className = "form-input">
					<label className = "text-label">Name</label>
					<input onChange = {(e) => setForm({...form, ticketName: e.target.value})} value = {form.ticketName} type = "text"/>
				</div>
				{form.id !== "" && (
					<div className = "form-input">
						<label className = "">Status</label>
						<select value = {form.ticketStatus} onChange = {(e) => setForm({...form, ticketStatus: e.target.value})}>
							<option disabled value = "">---</option>
							{board.statuses.filter((status) => board.statusesToDisplay.includes(status.id)).map((status) => {
								return <option key = {status.id} value = {status.id}>{status.name}</option>
							})}
						</select>	
					</div>
				)}
				<div className = "form-input">
					<label className = "text-label">Description</label>
					<textarea onChange = {(e) => setForm({...form, ticketDescription: e.target.value})}  value = {form.ticketDescription} ></textarea>
				</div>
				<div className = "form-input">
					<label className = "">Priority</label>
					<select value = {form.priority} onChange = {(e) => setForm({...form, priority: e.target.value})}>
						<option disabled value = "">---</option>
						{board.priorityList.map((priority) => {
							return <option key = {priority.id} value = {priority.id}>{priority.name}</option>
						})}
					</select>
				</div>
				<div className = "form-input">
					<input type = "submit" className = "btn"/>
				</div>
			</form>
		</div>
	)	
}
