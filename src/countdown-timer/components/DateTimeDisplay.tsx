import React from "react"

type PropType = {
	value: number
	type: string
	isDanger: boolean
}

export const DateTimeDisplay = ({value, type, isDanger}: PropType) => {
	return (
		<div className = {isDanger ? "text-red-500" : "text-current"}>
			<p>{value}</p>	
			<span className = "font-bold">{type}</span>
		</div>
	)
}