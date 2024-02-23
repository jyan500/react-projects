import React, { useState } from "react"
import "../../common/styles/common.css" 
import { useAppDispatch, useAppSelector } from "../../redux-hooks"

export const TicketForm = () => {
	const [form, setForm] = useState({
		ticketName: "",
		ticketDescription: "",
		priority: "" 
	})
	const dispatch = useAppDispatch()
	const board = useAppSelector((state) => state.board)
	const onSubmit = () => {

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
					<select onChange = {(e) => setForm({...form, priority: e.target.value})}>
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
