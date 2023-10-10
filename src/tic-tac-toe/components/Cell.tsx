import React from "react"
import { connect } from "react-redux"
import { iCheckGameStateAction, iFillCellAction, iSwitchPlayerAction, checkGameState, fillCell, switchPlayer } from "../actions/actions" 
import { CellPayload } from "../types/common" 

type StateProps = {
	numPlayers: number
	currentTurn: number
	markers: Record<string, any>
	result: string
}

type OwnProps = {
	key: string
	value: string
	className: string
	rowIndex: number
	colIndex: number
}

type DispatchProps = {
	checkGameState: (payload: CellPayload) => iCheckGameStateAction
	fillCell: (payload: CellPayload) => iFillCellAction
	switchPlayer: () => iSwitchPlayerAction
}

type Props = OwnProps & StateProps & DispatchProps

export const Cell: React.FC<Props> = (props) => {
	const fillCell = () => {
		// you cannot fill a cell that already has a value
		if (!props.value && props.result === ""){
			props.fillCell({
				value: props.markers[props.currentTurn], 
				rowIndex: props.rowIndex, 
				colIndex: props.colIndex
			})
			props.checkGameState({
				value: props.markers[props.currentTurn], 
				rowIndex: props.rowIndex, 
				colIndex: props.colIndex
			})
			if (props.result === ""){
				props.switchPlayer()
			}
		}
	}
	return (
		<div onClick = {fillCell} className={props.className}>
			<span className = "text-8xl">{props.value}</span>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	numPlayers: state.game.numPlayers,
	currentTurn: state.game.currentTurn,
	markers: state.game.markers,
	result: state.game.result,
})

const mapDispatchToProps = {
	checkGameState,
	fillCell,
	switchPlayer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell)