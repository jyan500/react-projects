import React from "react"
import "./Shapes.css"

export const Shapes = () => {
	return (
		<div className = "shapes-container">
			<div className = "shapes-card">
				<h1><a href="https://css-tricks.com/the-shapes-of-css/#aa-12-point-burst-shape-via-alan-johnson">Alan Johnson's Point Burst Shape</a></h1>
				<div className = "shape">
					<div className = "burst-12">
					</div>		
				</div>
			</div>
			<div className = "shapes-card">
				<h1><a href="https://css-tricks.com/the-shapes-of-css/#aa-12-point-burst-shape-via-alan-johnson">Point Burst Shape w/ Rounded Corners</a></h1>
				<div className = "shape">
					<div className = "burst-12-rounded">
					</div>		
				</div>
			</div>
			<div className = "shapes-card">
				<h1><a href="https://css-tricks.com/the-shapes-of-css/#aa-star-5-points-shape-via-kit-macallister">Kit McAllisters' Star (5 Points) Shape</a></h1>
				<div className = "shape">
					<div className = "star-five"></div>
				</div>
			</div>
		</div>
	)		
}