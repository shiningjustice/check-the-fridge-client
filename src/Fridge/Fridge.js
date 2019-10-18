import React, { Component } from "react";
import FridgeSection from "../FridgeSection/FridgeSection";
import ApiContext from "../ApiContext";

export default class Fridge extends Component {
	static contextType = ApiContext;

	render() {
		const { sections=[] }= this.context;
		// let conditionalRender;
		// if (this.context.items > 0) {
		// 	conditionalRender = (
		// 		<>
		// 			{sections.map(section => 
		// 				<div className='FridgeSection__div' key={section.id}>
		// 					<FridgeSection
		// 						id={section.id}
		// 						name={section.name}
		// 						items={section.items}
		// 					/>
		// 				</div>
		// 			)}
		// 		</>
		// 	)
		// }
		// else {
		// 	conditionalRender = (
		// 		<>
		// 			<h3>No items were found for your selections</h3>
		// 			<p>Please try again or click 'Reset Fields'.</p>
		// 		</>
		// 	)
		// }

		return (
			<>
				<h2>Your Fridge</h2>
				<div className='Fridge__div'>
					{sections.map(section => 
						<div className='FridgeSection__div' key={section.id}>
							<FridgeSection
								id={section.id}
								name={section.name}
								items={section.items}
							/>
						</div>
					)}
				</div>
			</>
		);
	}
}