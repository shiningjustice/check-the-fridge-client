import React, { Component } from "react";
import FridgeSection from "../FridgeSection/FridgeSection";
import ApiContext from "../../contexts/ApiContext";
import EditItem from '../../routes/EditItem/EditItem';
import './Fridge.css'

export default class Fridge extends Component {
	static contextType = ApiContext;

	state = {
		editItem: 'hidden',
	}

	render() {
		const { fridge=[] }= this.context;

		return (
			<div className='Fridge__div mainContainer'>
				<h2>Your Fridge</h2>
				<div className='Fridge__div'>
					{fridge.map(section => 
						<div className='FridgeSection__div' key={section.sectionId}>
							<FridgeSection
								id={section.sectionId}
								name={section.sectionName}
								display={section.display}
							/>
						</div>
					)}
					<EditItem className='hidden' />
				</div>
			</div>
		);
	}
}