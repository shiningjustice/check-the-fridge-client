import React, { Component } from "react";
import PropTypes from "prop-types";
import ApiContext from "../contexts/ApiContext";

export default class ErrorPage extends Component {
	static contextType = ApiContext;

	state = {
		error: null
	};

	// Static method
	static getDerivedStateFromError(error) {
		return { error };
	}
	render() {
		if (this.state.error) {
			return (
				<main className='error-page'>
					<h1>Something went wrong</h1>
					<p>Try refreshing the page</p>
					<p>{this.state.error.message}</p>
				</main>
			);
		}
		return this.props.children;
	}
}

ErrorPage.propTypes = {
	children: PropTypes.object.isRequired
};
