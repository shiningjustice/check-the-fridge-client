import React, { Component } from "react";
import Options from "../../components/Options/Options";
import Fridge from '../../components/Fridge/Fridge';
import ApiContext from "../../contexts/ApiContext";

import './DemoMain.css';

export default class DemoMain extends Component {
	static contextType = ApiContext;

	render() {
		const { errorDemoMain } = this.context;
		return (
			<main className='DemoMain__main'>
				{errorDemoMain && <div className='DemoMain__div errorDiv'>{errorDemoMain}</div>}
				<Options parent='DemoMain'/>

				<Fridge />
			</main>
		);
	}
}
