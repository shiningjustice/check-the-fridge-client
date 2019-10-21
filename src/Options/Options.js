import React, { Component } from "react";
import { Link } from "react-router-dom";

import ApiContext from "../ApiContext";
import Checkboxes from "./Checkbox.jsx";
import "./Options.css";

export default class Options extends Component {
	static contextType = ApiContext;

	state = {
		search: '',
		filteredFolders: [],
		sort: '', 
	};
	
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
	handleChangeSort = e => {
		this.setState({
			sort: e.target.value
		})
	}
	
	handleSubmit = e => {
		e.preventDefault();
		const { search, filteredFolders, sort } = this.state;
	
		this.context.updateForOptions(search, filteredFolders, sort);
	}
	handleReset = () => {
		//reset App, Options, and Checkbox states and does default get call
		this.context.getForStandard()
		this.setState({
			search: '',
			filteredFolders: [],
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
			</div>
		);
	}
}
