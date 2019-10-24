import React from 'react';

import './Checkboxes.css';

const Checkboxes = props => {

	return (
		<div className={`Checkboxes__div mainContainer ${props.display}`}>
			<h4 htmlFor={props.name} className='Options__h4'>{props.name}</h4>
			<div className='Checkboxes__div checkboxContainer'>
				{props.sections.map(section => {
					return (
						<div className='Checkboxes__div checkboxes' key={section.id}>
							<input
								className='Checkboxes__input'
								id={section.id}
								name={section.name}
								onChange={props.handleChange}
								value={section.id}
								// checked={props.filteredFolders.indexOf(section) > -1}
								type='checkbox'
							/>
							<label className='Checkboxes__label'>{section.name}</label>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default Checkboxes;

// VERSION 2
// import PropTypes from 'prop-types';

// const Checkbox = ({ type = 'checkbox', id, checked, onChange }) => (
// 	<input type={type} key={id} checked={checked} onChange={onChange} />
// )

// Checkbox.propTypes = {
// 	type: PropTypes.string, 
// 	id: PropTypes.number.isRequired, 
// 	checked: PropTypes.bool, 
// 	onChange: PropTypes.func.isRequired,
// }

// VERSION 1
// export default class Checkbox extends Component {
// 	state = {
// 		checked: false
// 	};

// 	handleClick = id => {
// 		var toggleChecked = new Promise((resolve, reject) => {
// 			resolve (this.setState({ checked: !this.state.checked }))
// 		})
// 		toggleChecked.then(() => 
// 				this.state.checked 
// 					? this.props.handleAddFilter(id)
// 					: this.props.handleRemoveFilter(id)
// 			)
			
// 	};

// 	resetCheckboxState = () => {
// 		this.setState({checked: false})
// 	}

// 	render() {		
// 		const section = this.props.section;
//     // if you want to check what the value is of something u just changed, do it on the render. This ensures the state has changed before you get confirmation
// 		return (
// 			<div key={section.id}>
// 				<label htmlFor={section.id} key={`label_${section.id}`}>
// 					<input
// 						type='checkbox'
// 						value={section.id}
// 						id={section.id}
// 						// key={`input_{section.id}`}
// 						name={section.name}
// 						// value={this.state.value}
// 						onChange={() => this.handleClick(section.id)}
// 					/>
// 					{section.name}
// 				</label>
// 			</div>
// 		);
// 	}
// }
