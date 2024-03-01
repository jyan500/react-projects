import React, { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../redux-hooks" 
import type { Status } from "../types/common" 
import "../../common/styles/common.css" 
import "../styles/status-form.css"
import { IoMdClose } from "react-icons/io";
import { MdOutlineArrowBackIosNew as ArrowBackward } from "react-icons/md"
import { MdOutlineArrowForwardIos as ArrowForward } from "react-icons/md"

// change visible statuses
// add custom statuses
type FormType = {
	statuses: Array<Status>
	statusesToDisplay: Array<string>
}
export const StatusForm = () => {
	const dispatch = useAppDispatch()
	const board = useAppSelector((state) => state.board)
	const defaultForm = {
		"statuses": [...board.statuses],	
		"statusesToDisplay": [...board.statusesToDisplay]
	}
	const [form, setForm] = useState<FormType>(defaultForm)
	const [selectedStatusId, setSelectedStatusId] = useState<String | null>(null)

	const onSubmit = () => {
	}		

	const setOrder = (statusId: String, isBackwards: boolean) => {
		const selectedStatusIndex = form.statuses.findIndex((status: Status) => status.id === statusId)	
		const selectedStatus = form.statuses[selectedStatusIndex]
		// you cannot move order of 1 any further backwards
		if (selectedStatus && (isBackwards && selectedStatus.order !== 1) || (!isBackwards && selectedStatus.order !== form.statuses.length)){
			// find the element that was previously one behind and swap places with this element
			const previousIndex = form.statuses.findIndex((status: Status) => (isBackwards ? (selectedStatus.order - 1 === status.order) : selectedStatus.order + 1 === status.order))
			const previous = form.statuses[previousIndex]
			if (previous){
				let temp = [...form.statuses]
				let tempPrevOrder = previous.order
				let tempSelectedOrder = selectedStatus.order
				temp[selectedStatusIndex].order = tempPrevOrder
				temp[previousIndex].order = tempSelectedOrder
				setForm({...form, statuses: temp})
			}
		}	
	}

	const setOrderBackward = (statusId: String) => {
		const selectedStatusIndex = form.statuses.findIndex((status: Status) => status.id === statusId)	
		const selectedStatus = form.statuses[selectedStatusIndex]
		// you cannot move order of 1 any further backwards
		if (selectedStatus && selectedStatus.order !== 1){
			// find the element that was previously one behind and swap places with this element
			const previousIndex = form.statuses.findIndex((status: Status) => selectedStatus.order - 1 === status.order)
			const previous = form.statuses[previousIndex]
			if (previous){
				let temp = [...form.statuses]
				let tempPrevOrder = previous.order
				let tempSelectedOrder = selectedStatus.order
				temp[selectedStatusIndex].order = tempPrevOrder
				temp[previousIndex].order = tempSelectedOrder
				setForm({...form, statuses: temp})
			}
		}
	}

	const setOrderForward = (statusId: String) => {
		const selectedStatusIndex = form.statuses.findIndex((status: Status) => status.id === statusId)	
		const selectedStatus = form.statuses[selectedStatusIndex]
		// you cannot move the last index any further backwards
		if (selectedStatus && selectedStatus.order !== form.statuses.length){
			// find the element that was previously one behind and swap places with this element
			const previousIndex = form.statuses.findIndex((status: Status) => selectedStatus.order + 1 === status.order)
			const previous = form.statuses[previousIndex]
			if (previous){
				let temp = [...form.statuses]
				let tempPrevOrder = previous.order
				let tempSelectedOrder = selectedStatus.order
				temp[selectedStatusIndex].order = tempPrevOrder
				temp[previousIndex].order = tempSelectedOrder
				setForm({...form, statuses: temp})
			}
		}

	}

	const sortKey = (a: Status, b: Status) => {
		if (a.order < b.order){
			return -1
		}
		else if (a.order > b.order){
			return 1
		}
		else {
			return 0
		}
	}

	return (
		<div className = "container">
			<div className = "status-col">
				<div className = "status-row">
					{form.statuses.sort(sortKey).map((status: Status) => {
						return (
							<div key = {status.id}>
								<button 
									className = {`${selectedStatusId === status.id ? "status-selected": ""}`} 
									onClick = {() => {
										setSelectedStatusId(status.id === selectedStatusId ? null : status.id)}
									}>
									{status.name}
								</button>
							</div>
						)
					})}
				</div>
				{selectedStatusId != null ? 
					<div className = "status-row">
						<button onClick = {(e) => setOrder(selectedStatusId, true)}><ArrowBackward /></button>
						<button onClick = {(e) => setOrder(selectedStatusId, false)}><ArrowForward /></button>
					</div>
				: null}
			</div>
		</div>
	)	
}