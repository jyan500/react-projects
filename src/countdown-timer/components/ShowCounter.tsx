import React from "react"
import { DateTimeDisplay } from "./DateTimeDisplay"

type PropType = {
	days: number
	hours: number
	minutes: number
	seconds: number
}

export const ShowCounter = ({days, hours, minutes, seconds}: PropType) => {
	return (
		<div className = "flex items-center border-2 p-6">
			{/* Passes in the isDanger to style the particular display to show that the time will expire soon */}
			<DateTimeDisplay value = {days} type={"Days"} isDanger={false}/>
			<p className = "pl-3 pr-3">:</p>
			<DateTimeDisplay value = {hours} type={"Hours"} isDanger={false} />
			<p className = "pl-3 pr-3">:</p>
			<DateTimeDisplay value = {minutes} type={"Minutes"} isDanger={minutes <= 1} />
			<p className = "pl-3 pr-3">:</p>
			<DateTimeDisplay value = {seconds} type={"Seconds"} isDanger={false} />
		</div>
	)
}