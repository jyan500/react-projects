import { useEffect, useState } from "react"

/**
 * Custom Hook that takes target date and returns the amount of 
 * days, hours, minutes, seconds remaining
 */
export const useCountdown = (targetDate: Date | null) => {
	const countDownDate = targetDate ? new Date(targetDate).valueOf() : null

	const [countDown, setCountDown] = useState(
		countDownDate ? countDownDate - new Date().valueOf() : null
	)

	useEffect(() => {
		// every second, set the amount of time remaining by subtracting the target date from
		// the current time
		if (countDownDate) {

			const interval = setInterval(() => {
				setCountDown(countDownDate.valueOf() - new Date().valueOf())
			}, 1000)

			// perform necessary clean up. After the set interval is done,
			// return a callback to clear the interval 
			return () => clearInterval(interval)
		}

	}, [countDownDate])

	return getReturnValues(countDown)
}

/**
 * Calculates the amount of time left, note that calculations
 * are conversions from milliseconds into the specified format
 */
const getReturnValues = (countDown: number | null) => {
	const days = countDown ? Math.floor(countDown / (1000 * 60 * 60 * 24)) : 0
	const hours = countDown ? Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : 0
	const minutes = countDown ? Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)) : 0
	const seconds = countDown ? Math.floor((countDown % (1000 * 60))/ 1000) : 0
	return [days, hours, minutes, seconds]
}
