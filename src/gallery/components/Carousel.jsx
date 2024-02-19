import React, {useState} from "react"
import "../styles/Carousel.css" 
import "../styles/Gallery.css"
import { IoMdClose } from "react-icons/io";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export const Carousel = ({players, setShowCarousel}) => {
	const [page, setPage] = useState(0)
	console.log("page: ", page)
	console.log("players[page]: ", players[page])
	const onNext = () => {
		if (page < players.length){
			setPage(page+1)
		}
	}
	const onPrev = () => {
		if (page > 0){
			setPage(page-1)
		}
	}
	return (
		<div className = "modal-container">
			<div className = "carousel-container">
				<button onClick={() => setShowCarousel(false)} ><IoMdClose className = "close-button m-text"/></button>
				<div className = "carousel">
					<button onClick={onPrev}><GrPrevious/></button>	
					<div className = "carousel-content">
						<div className = "carousel-image">
							<img src = {players[page].url}/>
						</div>
						<div>
							<p className = "l-text">{players[page].title}</p>
							<ul>{players[page].description.map((text) => <li>{text}</li>)}</ul>
						</div>
					</div>
					<button onClick={onNext}><GrNext/></button>
				</div>
			</div>
		</div>
	)
}