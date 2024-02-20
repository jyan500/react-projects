import React from "react"
import "../styles/Weather.css"

export const WeatherPanel = ({weather}) => {
	return (
		<div className = "panel">
			<img className = "" width = "100" height = "100" src = {weather.icon}/>
			<p className = "m-text">{weather.name}</p>
			<p className = "s-text">{weather.shortForecast}</p>
		</div>
	)
}