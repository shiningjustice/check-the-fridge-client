import React, { Component } from "react";
import Options from "../Options/Options";
import Fridge from "../Fridge/Fridge";
import ApiContext from "../ApiContext";

export default class ListViewMain extends Component {
	static contextType = ApiContext;

	render() {
		const { sections=[] } = this.context;
		return (
			<main className='ListView__main'>
				<Options 
					sections={sections}
				/>

				<Fridge />
			</main>
		);
	}
}
