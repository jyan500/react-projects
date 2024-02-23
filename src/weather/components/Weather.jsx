import React, {useState} from "react"
import { SearchBar } from "./SearchBar"
import { WeatherPanel } from "./WeatherPanel"
import "../styles/Weather.css"
import "../../common/styles/common.css"

export const Weather = () => {
	const url = "https://api.weather.gov/points/"
	const [forecast, setForecast] = useState([])
	const [loading, setLoading] = useState(false)
	const [showError, setShowError] = useState(false)
	// get the url for the forecast using the latlong,
	// and then get the actual forecast for that location
	const forecastUrlRequest = (latlong) => {
		return new Promise((resolve, reject) => {
			fetch(`${url}${latlong}`).then((res) => res.json()).then((res) => resolve(res.properties.forecast)).catch((err) => reject(err))
		})
	}
	const forecastRequest = (forecastUrl) => {
		return new Promise((resolve, reject) => {
			fetch(forecastUrl).then((res) => res.json()).then((res) => resolve(res.properties.periods)).catch((err) => reject(err))
		})
	}
	const onSearch = (latlong) => {
		setLoading(true)
		setShowError(false)
		setForecast([])
		forecastUrlRequest(latlong).then(forecastRequest).then((res) => {
			setForecast(res)
			setLoading(false)
		}).catch((res) => {
			setShowError(true)
		})
		.finally((res) => {
			setLoading(false)
		})
	}

	return (
		<div className = "weather-container">
			<div className = "side-column"></div>
			<div className = "middle-column">
				<h1 className = "jumbotron l-text">Weather App</h1>
				<p className = "s-text">Sourced From api.weather.gov</p>
				<SearchBar onSearch={onSearch}/>
				{forecast.length !== 0 && (<p className = "l-text">7 Day Forecast</p>)}
				{loading && (<div><p className = "s-text">Loading...</p></div>)}
				{showError && (<p className = "error-text s-text">Could not get results! Please try again. </p>)}
				<div className = "weather-grid">
					{forecast.map((fCast) => <WeatherPanel key = {fCast.number} weather={fCast}/>)}
				</div>
			</div>
			<div className = "side-column">
			</div>
		</div>
	)
}