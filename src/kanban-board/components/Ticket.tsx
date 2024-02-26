import React from "react"
import "../../common/styles/common.css"
import type { Ticket as TicketType } from "../types/common"

type PropType = {
	ticket: TicketType
}

export const Ticket = ({ticket}: PropType) => {
	return (
		<div className = "container">
			<div>
				<p>{ticket.ticketName}</p>	
				<p>{ticket.ticketDescription}</p>	
				<p>{ticket.ticketStatus.name}</p>	
				<p>{ticket.priority.name}</p>	
			</div>
		</div>
	)	
}