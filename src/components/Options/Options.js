import React, { Component } from "react";

import ApiContext from "../../contexts/ApiContext";
import SearchBar from './OptionsComponents/SearchBar';
import Checkboxes from './OptionsComponents/Checkboxes';
import SortCategories from './OptionsComponents/SortCategories';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import "./Options.css";

export default class Options extends Component {
	static contextType = ApiContext;

	state = {
		search: '',
		filteredFolders: [],
		sort: '', 
		searchToggle: 'hidden', 
		filterSortToggle: 'shown',
		filterToggleOptions: 'hidden',
		sortToggleOptions: 'hidden',
	};


	//Toggle display on mobile
	handleToggle = (location, entity) => {
		const suffix = (location === 'nav') ? 'Toggle' : 'ToggleOptions';
		const nameToggle = entity + suffix;
		let value;
		let entityToHide;

		if (this.state[nameToggle] === 'hidden') {
			value = 'shown';
			entityToHide = (location === 'nav') ? ((entity === 'search') ? 'filterSortToggle' : 'searchToggle') : ((entity === 'filter') ? 'sortToggleOptions' : 'filterToggleOptions');
			this.setState({[entityToHide]: 'hidden'});
		}
		else {
			value = 'hidden';
			(entityToHide === 'filterSortToggle') && this.setState({[entityToHide]: 'shown'})
		}

		this.setState({[nameToggle]: value});
		// entityToHide && this.setState({[entityToHide]: oppValue});
		console.log('toggle ' + entity + 'in ' + location + 'it is now ' + value)
	}

	//Handle Changes
	handleInputChange = e => {
		let value = e.target.value;
		let name = e.target.name;

		//if the section is supposed to be a type===number then make sure it is
		(name === 'sectionId') && (value = +value)
		
		this.setState({
			[name]: value
		});
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
			sort: '',
			filterToggle: 'hidden',
			sortToggle: 'hidden',
		})
	}


	render() {
		const sections = this.context.sections;
		const searchIcon = <FontAwesomeIcon icon={faSearch} />

		return (
			<form className={`Options__form mainContainer ${this.props.parent}`} onSubmit={e => this.handleSubmit(e)}>
					
				<SearchBar
					handleChange={this.handleInputChange}
					searchIcon={searchIcon}
					handleClick={this.handleToggle}
					display={this.state.searchToggle}
				/>

				<div className='Options___sortFilter'>
					<div className={`Options__div h3___container ${this.state.filterSortToggle}`}>
						{/* Option: Filter by category */}
						<h3 className='Options__h3 h3___button' onClick={() => this.handleToggle('filterSort', 'filter')}>Filter</h3>
						{/* Option: Sort By */}
						<h3 className='Options__h3 h3___button' onClick={() => this.handleToggle('filterSort', 'sort')}>Sort</h3>
					</div>

					<div className={`Options__div components__container ${this.state.sortToggleOptions || this.state.filterToggleOptions}`}>
						{/* Form buttons */}
						<div className='Options__div button__container'>
							<button className='Options__button' type='reset' onClick={() => this.handleReset()}>
								Reset form
							</button>{' '}
							<button className='Options__button' type='submit'>
								Apply Options
							</button>
						</div>
						
						<Checkboxes 
							display={this.state.filterToggleOptions}
							name='Category (Section)'
							sections={sections}
							handleChange={this.handleSortCheckboxes}
							filteredFolders={this.state.filteredFolders}
						/>
					
						<SortCategories 
							display={this.state.sortToggleOptions}
							handleChange={this.handleInputChange}
						/>
					</div>
				</div>
			</form>
		);
	}
}
