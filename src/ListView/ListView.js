import React, { Component } from "react";
import Options from "../Options/Options";
import Fridge from "../Fridge/Fridge";

export default class ListView extends Component {
	render() {
		return (
			<>
				<Options />

				<Fridge />
			</>
		);
	}
}
