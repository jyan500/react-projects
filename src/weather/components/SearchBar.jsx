import React, { useState } from "react"
import "../styles/SearchBar.css" 
import "../styles/Weather.css"
import { latlong } from "../constants"

export const SearchBar = ({onSearch}) => {
	const [searchTerm, setSearchTerm] = useState("")	
	const onSubmit = (e) => {
		e.preventDefault()
		if (searchTerm !== ""){
			onSearch(searchTerm)
		}
	}
	return (
		<div className = "form-container">
			<form className = "form" onSubmit = {onSubmit}>
				<div className = "form-input">
					<label className = "text-label m-text" htmlFor = "text">Select City: </label>
					<select className = "text-input s-text" onChange = {(e) => setSearchTerm(e.target.value)} >
						<option value="" selected disabled hidden>Choose here</option>	
						{ latlong.map((obj, i) => {
							return (<option key = {obj.id} value = {obj.latlong}>{obj.city}</option>)
						})}
					</select>
				</div>
				<input className = "btn" type = "submit" value = "Submit"/>
			</form>
		</div>
	) }