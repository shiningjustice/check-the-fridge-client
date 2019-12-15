import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ErrorPage extends Component {
	constructor(props) {
    super(props);

    this.state = {
			error: null,
    }
	}
	
  static getDerivedStateFromError(error) {
		return { error };
  }

  componentDidCatch(error) {
		return { error };
  }

	render() {
		if (this.state.error) {
			return (
				<main className='error-page'>
					<h1>Something went wrong</h1>
					<p>Try refreshing the page</p>
				</main>
			);
		}
		return this.props.children;
	}
}

ErrorPage.propTypes = {
	children: PropTypes.object.isRequired
};
