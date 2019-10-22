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
		if (this.state.error && this.context.items.length === 0) {
			return (
				<main className='error-page'>
					<h1>Something seems to have gone wrong</h1>
					<p>Try refreshing the page</p>
					<p>{this.state.error}</p>
				</main>
			);
		}

		if (this.state.error) {
			return (
				<main className='error-page'>
					<h1>Something seems to have gone wrong</h1>
					<p>Try refreshing the page</p>
					<p>{this.state.error}</p>
				</main>
			);
		}
		return this.props.children;
	}
}

ErrorPage.propTypes = {
	children: PropTypes.object.isRequired
};
