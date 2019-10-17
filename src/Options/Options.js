import React, { Component } from "react";
import { Link } from "react-router-dom";

import ApiContext from "../ApiContext";
import Checkbox from "./Checkbox";
import "./Options.css";

export default class Options extends Component {
	static contextType = ApiContext;

	state = {
		search: '',
		filteredFolders: [],
		sort: ''
	};

	handleAddFilter = id => {
		this.setState({
			filteredFolders: [...this.state.filteredFolders, id]
		});
		console.log('added')
	}
	handleRemoveFilter = id => {
		this.setState({
			filteredFolders: this.state.filteredFolders.filter(folderId => folderId !== id)
		});
		console.log('removed')
	}
	handleChangeSort = e => {
		this.setState({
			sort: e.target.value
		})
	}
	handleChangeSearch = e => {
		this.setState({
			search: e.target.value
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		const { search, filteredFolders } = this.state;
		console.log(`in options, search = ${search} and filteredFolders = ${filteredFolders}`)
		this.context.updateForOptions(search, filteredFolders);
		//setSort will be called in a chain to the updateForOptions function
		console.log({search})
	}
	handleReset = () => {
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
							<label htmlFor='search'>Search</label>
							<input name='search' type='text' onChange={(e) => this.handleChangeSearch(e)}></input>
						</fieldset>

						{/* Option: Filter by category */}
						<fieldset className='Option__fieldset'>
							<h3>Filter By:</h3>
							<p className='Option__p'>Category (Section)</p>
							{sections.map(section => (
								<Checkbox 
									section={section} 
									handleAddFilter={this.handleAddFilter}
									handleRemoveFilter={this.handleRemoveFilter}
									key={section.id}
								/>
							))}
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
