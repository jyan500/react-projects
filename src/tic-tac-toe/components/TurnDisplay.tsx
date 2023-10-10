import React from "react"
import { connect } from "react-redux"

type OwnProps = {

}

type StateProps = {
	currentTurn: number
	result: string
}

type DispatchProps = {

}

type Props = OwnProps & StateProps & DispatchProps

export const TurnDisplay: React.FC<Props> = (props) => {
	return (
		<div>
			<h1 className = "text-4xl">{!props.result ? (props.currentTurn == 1 ? "Player 1" : "Player 2") : props.result}</h1>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	currentTurn: state.game.currentTurn,
	result: state.game.result
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnDisplay)
