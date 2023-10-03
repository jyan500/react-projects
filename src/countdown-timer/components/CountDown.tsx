import React, { useState } from "react"
import DateTimePicker from 'react-datetime-picker';
import { CountDownTimer } from "./CountDownTimer"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export const CountDown = () => {
	const [targetDate, setTargetDate] = useState<Date | null>(new Date())
	return (
		<div>
			<div className = "pt-3 pb-3">
		    	<DateTimePicker minDate={new Date()} disableClock={true} onChange={setTargetDate} value={targetDate} />
	    	</div>
	    	<div className = "pt-3 pb-3">
		    	<CountDownTimer targetDate = {targetDate}/>
	    	</div>
	    </div>
	)
}