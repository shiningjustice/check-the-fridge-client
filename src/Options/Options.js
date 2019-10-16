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


	handleSubmit = e => {
		e.preventDefault();
		const { search, filteredFolders, sort } = this.state;
		this.context.updateForOptions(search, filteredFolders, sort);

	};

	handleChangeFilter = id => {
		this.setState({
			filteredFolders: [...this.state.filteredFolders, id]
		});
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
									addToArray={this.addToArray}
									key={section.id}
								/>
							))}
						</fieldset>

						{/* Option: Sort By */}
						<fieldset className='Option__fieldset'>
							<h3>Sort By:</h3>
							<select className='Option__select' onChange={() => this.handleChangeSort()}>
								<option value='' className='Option__option'>
									Select one
								</option>
								<option value='ageOldest' className='Option__option'>
									Age: Oldest to newest
								</option>
								<option value='ageNewest' className='Option__option'>
									Age: Newest to oldest
								</option>
								<option value='nameAlpha' className='Option__option'>
									Name: A to Z
								</option>
								<option value='quantLow' className='Option__option'>
									Quantity: Least to greatest
								</option>
							</select>
						</fieldset>
					</div>

					{/* Form buttons */}
					<button className='Options__button' type='reset' onClick={() => this.context.getForStandard()}>
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
