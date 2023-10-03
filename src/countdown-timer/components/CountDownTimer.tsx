import React from "react"
import { useCountdown } from "../hooks/useCountdown"
import { ExpiredNotice } from "./ExpiredNotice" 
import { ShowCounter } from "./ShowCounter"

type propType = {
	targetDate: Date | null
}

export const CountDownTimer = (props: propType) => {
	const [days, hours, minutes, seconds] = useCountdown(props.targetDate)

	if (days + hours + minutes + seconds <= 0){
		return <ExpiredNotice/>
	}
	else {
		return (
			<div className = "flex justify-center">
				<ShowCounter
					days={days}
					hours={hours}
					minutes={minutes}
					seconds={seconds}
				/>
			</div>
		)
	}
}