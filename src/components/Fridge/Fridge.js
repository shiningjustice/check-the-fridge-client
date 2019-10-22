import React, { Component } from "react";
import FridgeSection from "../FridgeSection/FridgeSection";
import ApiContext from "../../contexts/ApiContext";
import EditItem from '../../routes/EditItem/EditItem';

export default class Fridge extends Component {
	static contextType = ApiContext;

	state = {
		editItem: 'hidden',
	}

	render() {
		const { sections=[] }= this.context;

		return (
			<>
				<h2>Your Fridge</h2>
				<div className='Fridge__div'>
					{sections.map(section => 
						<div className='FridgeSection__div' key={section.id}>
							<FridgeSection
								id={section.id}
								name={section.name}
							/>
						</div>
					)}
					<EditItem className='hidden' />
				</div>
			</>
		);
	}
}