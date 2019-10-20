import React, { Component } from "react";
import { Link } from "react-router-dom";

import ApiContext from "../ApiContext";
import Checkboxes from "./Checkbox.jsx";
import "./Options.css";

// VERSION 2
// const checkboxSections = new Map();

export default class Options extends Component {
	static contextType = ApiContext;

	state = {
		search: '',
		filteredFolders: [],
		// VERSION 2
		// filteredFolders: checkboxSections,
		sort: '', 
	};

	// VERSION 2
	// constructor(props) {
	// 	super(props);

	// 	this.props.sections.map(section => {
	// 		checkboxSections.set(section.id, false)
	// 	});
		
	// 	this.state = {
	// 		search: '',
	// 		filteredFolders: checkboxSections,
	// 		sort: '', 
	// 	};
	// }
	
	handleChangeSearch = e => {
		this.setState({
			search: e.target.value
		})
	}
	handleSortCheckboxes = e => {
		const newSelectedId = e.target.value;
		let newSelectionArray;

		if(this.state.filteredFolders.indexOf(newSelectedId) > -1) {
			newSelectionArray = this.state.filteredFolders.map(s => s !== newSelectedId)
		} else {
			newSelectionArray = [...this.state.filteredFolders, newSelectedId]
		}

		this.setState( prevState => ({
			filteredFolders: newSelectionArray
		}))
	}
	// VERSION 1 OF CHECKBOXES
	// handleAddFilter = id => {
	// 	this.setState({
	// 		filteredFolders: [...this.state.filteredFolders, id]
	// 	});
	// 	console.log('Options.js: checkbox added')
	// }
	// handleRemoveFilter = id => {
	// 	this.setState({
	// 		filteredFolders: this.state.filteredFolders.filter(folderId => folderId !== id)
	// 	});
	// 	console.log('Options.js: checkbox removed')
	// }
	// VERSION 2 OF CHECKBOXES
	// handleChangeFilter = (e) => {
	// 	const section = parseInt(e.target.id); 
	// 	const stateSection = this.state.filteredFolders.get(parseInt(section))
	// 	const isChecked = !stateSection;
	// 	this.setState(prevState => ({ filteredFolders: prevState.filteredFolders.set(section, isChecked) }))
	// }
	handleChangeSort = e => {
		this.setState({
			sort: e.target.value
		})
	}
	
	//VERSION 2
	// handleSubmitFilter = () => {
	// 	const checkedIds = [];
	// 	this.state.filteredFolders.forEach((val, key) => {
	// 		if (val) {
	// 			checkedIds.push(key)
	// 		}
	// 	})
	// 	console.log('checked items: ', checkedIds)
	// }
	handleSubmit = e => {
		e.preventDefault();
		const { search, filteredFolders, sort } = this.state;
	
		console.log(`Options.js: search = ${search} and filteredFolders = ${filteredFolders} and sort = ${sort}`)
		console.log(filteredFolders)

		// VERSION 2
		// this.handleSubmitFilter();
		this.context.updateForOptions(search, filteredFolders, sort);
	}
	handleReset = () => {
		//reset App, Options, and Checkbox states and does default get call
		this.context.resetAppState()
		this.setState({
			search: '',
			filteredFolders: [],
			// VERSION 2 OF CHECKBOXES
			// filteredFolders: checkboxSections,
			sort: ''
		})
	}


	render() {
		const sections = this.context.sections;
		return (
			<div className='Options__div'>

				{/* Add Item Button */}
				<Link to='/add-item'>
					<button className='Options__button'>Add Item</button>
				</Link>

				{/* All Options */}
				{/* Search bar (not functional) */}
				<form className='Options__form' onSubmit={e => this.handleSubmit(e)}>
					
					<div className='Options___fieldsets'>
						<fieldset className='Options_fieldset'>
							<label htmlFor='search'>Search Name</label>
							<input name='search' type='text' onChange={(e) => this.handleChangeSearch(e)}></input>
						</fieldset>

						{/* Option: Filter by category */}
						<fieldset className='Option__fieldset'>
							<h3>Filter By:</h3>
							{/* VERSION 1 AND 2  */}
							{/* <p className='Option__p'>Category (Section)</p>
							{sections.map(section => (
								<label key={section.id}>
									{section.name}
									<Checkbox
										className='Options___Checkbox'
										id={section.id}
										name={section.name}
										checked={this.state.filteredFolders.get(section.id)}
										onChange={(e) => this.handleChangeFilter(e)}
									/>
								</label>
							))} */}
							<Checkboxes 
								name='Category (Section)'
								sections={sections}
								handleChange={this.handleSortCheckboxes}
								filteredFolders={this.state.filteredFolders}
							/>
						</fieldset>

						{/* Option: Sort By */}
						<fieldset className='Option__fieldset'>
							<h3>Sort By:</h3>
							<select className='Option__select' onChange={(e) => this.handleChangeSort(e)}>
								<option value='' className='Option__option'>
									Select one
								</option>
								<option value='ageOld' className='Option__option'>
									Age: Oldest First
								</option>
								<option value='ageNew' className='Option__option'>
									Age: Newest First
								</option>
								<option value='alpha' className='Option__option'>
									Name: A to Z
								</option>
								{/* <option value='quantLow' className='Option__option'>
									Quantity: Least to greatest
								</option> */}
							</select>
						</fieldset>
					</div>

					{/* Form buttons */}
					<button className='Options__button' type='reset' onClick={() => this.handleReset()}>
						Reset form
					</button>
					<button className='Options__button' type='submit'>
						Apply Options
					</button>
				</form>
				{/* {this.context.searchOn && <p>Displaying results for 
					{this.context.searchTerm && ` search term ${this.context.searchTerm},`} 
					{this.context.filteredFolders && ` section(s) ${this.context.sections.map(section => {
						if (section.id === this.context.filteredFolders.map(id => id)) {
							return section.name
						}
					})
					}}`} </p>} */}
			</div>
		);
	}
}
