import React from "react"
import { connect } from "react-redux"

type OwnProps = {

}

type StateProps = {
	currentTurn: number
}

type DispatchProps = {

}

type Props = OwnProps & StateProps & DispatchProps

export const TurnDisplay: React.FC<Props> = (props) => {
	return (
		<div>
			<h1 className = "text-4xl">{props.currentTurn === 1 ? "Player 1" : "Player 2"}</h1>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	currentTurn: state.game.currentTurn
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnDisplay)
