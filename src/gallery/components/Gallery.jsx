import React, {useState} from "react"
import "../styles/Gallery.css"
import { activePlayers, retiredPlayers } from "../mockData"
import { Carousel } from "./Carousel" 

export const Gallery = () => {
	const [showCarousel, setShowCarousel] = useState(false)	
	return (
		<div>
			<div className = "jumbotron">
				<h1 className = "l-text">SSBM Top Captain Falcon Players</h1>
			</div>
			{showCarousel && (<Carousel setShowCarousel={setShowCarousel} players={[...activePlayers, ...retiredPlayers]}></Carousel>)}
			<button onClick = {() => setShowCarousel(true)}>Click here to show the carousel format</button>
			<div className = "gallery">
				<div className = "jumbotron">
					<h1 className = "m-text">Active Players</h1>
				</div>
				<div className = "gallery-container">
					{activePlayers.map((data) => {
						return (
							<div className = "gallery-image-container">
								{/* <img width = "200" height = "200" src = {"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}/>*/}
								<img width = "200" height = "200" src = {data.url}/>
								<p className = "m-text">{data.title}</p>
								<ul>
									{data.description.map((text) => {return <li>{text}</li>})}
								</ul>
							</div>	
						)
					})}
				</div>
				<div className = "jumbotron">
					<h1 className = "m-text">Legacy Players</h1>
				</div>
				<div className = "gallery-container">
					{retiredPlayers.map((data) => {
						return (
							<div className = "gallery-image-container">
								{/* <img width = "200" height = "200" src = {"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}/>*/}
								<img width = "200" height = "200" src = {data.url}/>
								<p className = "m-text">{data.title}</p>
								<ul>
									{data.description.map((text) => {return <li>{text}</li>})}
								</ul>
							</div>	
						)
					})}	
				</div>
			</div>
		</div>
	)	
}