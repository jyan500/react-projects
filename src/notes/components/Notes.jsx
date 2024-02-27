import React, {useState} from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import "../../common/styles/common.css"
import "../styles/Notes.css"

export const Notes = () => {
	const [notes, setNotes] = useLocalStorage("notes", "")
	return (
		<div className = "container">
			<textarea rows = "50" cols = "100" value = {notes} onChange = {(e) => setNotes(e.target.value)}></textarea>
		</div>
	)
}