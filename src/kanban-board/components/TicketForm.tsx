import React, { useState } from "react"
import "../../common/styles/common.css" 
import { useAppDispatch, useAppSelector } from "../../redux-hooks"
import { addTicketToBoard, toggleShowModal } from "../slices/boardSlice"
import { v4 as uuidv4 } from "uuid" 

export const TicketForm = () => {
	const [form, setForm] = useState({
		ticketName: "",
		ticketDescription: "",
		priority: "",
		// default TODO
		ticketStatus: "1"
	})
	const dispatch = useAppDispatch()
	const board = useAppSelector((state) => state.board)
	const onSubmit = () => {
		const status = board.statuses.find((status) => status.id === form.ticketStatus)
		const priority = board.priorityList.find((priority) => priority.id === form.priority)
		if (priority && status){
			dispatch(addTicketToBoard({
				...form,
				id: uuidv4(),
				priority: priority,
				ticketStatus: status
			}))
			dispatch(toggleShowModal(false))
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
					<input onChange = {(e) => setForm({...form, ticketName: e.target.value})} value = {form.ticketName} type = ""/>
				</div>
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
