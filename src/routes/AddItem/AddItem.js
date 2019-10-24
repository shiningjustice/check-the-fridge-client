import React from 'react';

import ItemForm from '../../components/ItemForm/ItemForm';

export default function AddItem (props) {
	
	return (
		<ItemForm
			formName='AddItem'
			history={props.history}
		/>
	)
}