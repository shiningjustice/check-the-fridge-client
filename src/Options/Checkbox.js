import React, { Component } from "react";

export default class Checkbox extends Component {
	state = {
		checked: false
	};

	handleClick = id => {
		var toggleChecked = new Promise((resolve, reject) => {
			resolve (this.setState({ checked: !this.state.checked }))
		})
		toggleChecked.then(() => 
				this.state.checked 
					? this.props.handleAddFilter(id)
					: this.props.handleRemoveFilter(id)
			)
			
	};

	render() {
    const section = this.props.section;
    // if you want to check what the value is of something u just changed, do it on the render. This ensures the state has changed before you get confirmation
		return (
			<div key={section.id}>
				<label htmlFor={section.id} key={`label_${section.id}`}>
					<input
						type='checkbox'
						value={section.id}
						id={section.id}
						// key={`input_{section.id}`}
						name={section.name}
						onChange={() => this.handleClick(section.id)}
					/>
					{section.name}
				</label>
			</div>
		);
	}
}
