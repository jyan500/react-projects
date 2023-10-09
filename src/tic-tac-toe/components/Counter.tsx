import React from "react"
import { connect } from "react-redux"
import { increment, decrement } from "../actions/actions"

type stateProps = {
	count: number
}

type dispatchProps = {
	increment: () => void
	decrement: () => void
}

type props = stateProps & dispatchProps

export const Counter: React.FC<props> = ({count, increment, decrement}) => {
	console.log("count: ", count)
	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	)
}

type state = {
	counter: {count: number}
}

const mapStateToProps = (state: state) => ({
	count: state.counter.count,
})

const mapDispatchToProps = {
	increment,
	decrement
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

