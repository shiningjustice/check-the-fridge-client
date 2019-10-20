import React from "react";

import ItemForm from '../ItemForm/ItemForm'

export default function AddItem (props) {
	console.log(props.history)
	return (
		<ItemForm
			formName='AddItem'
			formVerb='Add'
			history={props.history}
		/>
	)
}