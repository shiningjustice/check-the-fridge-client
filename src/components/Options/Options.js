import React, { Component } from "react";

import ApiContext from "../../contexts/ApiContext";
import SearchBar from "./OptionsComponents/SearchBar/SearchBar";
import Checkboxes from "./OptionsComponents/Checkboxes/Checkboxes";
import SortCategories from "./OptionsComponents/SortCategories/SortCategories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Options.css";

export default class Options extends Component {
	static contextType = ApiContext;

	state = {
		search: "",
		filteredFolders: [],
		sort: "",
		navSearchDisplay: "hidden",
		navMoreDisplay: "shown",
		filterDisplay: "hidden",
		sortDisplay: "hidden"
	};

	handleToggleSearch = () => {
		const value = this.state.navSearchDisplay === "hidden" ? "shown" : "hidden";
		const oppValue = value === "hidden" ? "shown" : "hidden";

		this.setState({
			navSearchDisplay: value,
			navMoreDisplay: oppValue
		});
	};

	handleToggleMore = type => {
		const key = type === "filter" ? "filterDisplay" : "sortDisplay";
		const oppKey = type === "filter" ? "sortDisplay" : "filterDisplay";

		if (this.state[key] === "hidden") {
			this.setState({
				[key]: "shown",
				[oppKey]: "hidden"
			});
		} else {
			this.setState({
				[key]: "hidden"
			});
		}
	};

	//Handle Changes
	handleInputChange = e => {
		let value = e.target.value;
		let name = e.target.name;

		//if the section is supposed to be a type===number then make sure it is
		name === "sectionId" && (value = +value);

		this.setState({
			[name]: value
		});
	};
	handleSortCheckboxes = e => {
		const newSelectedId = e.target.value;
		let newSelectionArray;

		if (this.state.filteredFolders.indexOf(newSelectedId) > -1) {
			newSelectionArray = this.state.filteredFolders.map(
				s => s !== newSelectedId
			);
		} else {
			newSelectionArray = [...this.state.filteredFolders, newSelectedId];
		}

		this.setState(prevState => ({
			filteredFolders: newSelectionArray
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		const { search, filteredFolders, sort } = this.state;

		this.context.updateForOptions(search, filteredFolders, sort);
	};
	handleReset = () => {
		//reset App, Options, and Checkbox states and does default get call
		this.context.getForStandard();
		this.setState({
			search: "",
			filteredFolders: [],
			sort: "",
			filterToggle: "hidden",
			sortToggle: "hidden"
		});
	};

	componentDidMount = () => {
		if (this.props.parent === "DemoMain") {
			this.setState({
				navSearchDisplay: "shown",
				navMoreDisplay: "shown",
				filterDisplay: "shown",
				sortDisplay: "shown"
			});
		}
	};

	handleRender = (parent, searchIcon, sections) => {
		if (parent === "DemoMain") {
			return (
				<>
					<SearchBar
						handleChange={this.handleInputChange}
						searchIcon={searchIcon}
						handleClick={this.handleToggleSearch}
						display={this.state.navSearchDisplay}
					/>

					<div className='Options__div componentsContainer shown'>
						<h3 className='Options__h3'>Filter</h3>
						<Checkboxes
							display='shown'
							name='Category (Section)'
							sections={sections}
							handleChange={this.handleSortCheckboxes}
							filteredFolders={this.state.filteredFolders}
						/>

						<h3 className='Options__h3'>Sort</h3>
						<SortCategories
							display='shown'
							handleChange={this.handleInputChange}
						/>

						{/* Form buttons */}
						<div className='Options__div button__container'>
							<button
								className='Options__button'
								type='reset'
								onClick={() => this.handleReset()}
							>
								Reset form
							</button>{" "}
							<button className='Options__button' type='submit'>
								Apply Options
							</button>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<form
					className={`Options__form mainContainer ${parent}`}
					onSubmit={e => this.handleSubmit(e)}
				>
					<SearchBar
						handleChange={this.handleInputChange}
						searchIcon={searchIcon}
						handleClick={this.handleToggleSearch}
						display={this.state.navSearchDisplay}
					/>

					<div
						className={`Options___div sortFilter ${this.state.navMoreDisplay}`}
					>
						<div className='Options__div h3Container'>
							{/* Option: Filter by category */}
							<h3
								className='Options__h3 h3___button psuedoButton'
								onClick={() => this.handleToggleMore("filter")}
							>
								Filter
							</h3>

							{/* Option: Sort By */}
							<h3
								className='Options__h3 h3___button psuedoButton'
								onClick={() => this.handleToggleMore("sort")}
							>
								Sort
							</h3>
						</div>

						<div
							className={`Options__div componentsContainer ${
								this.state.filterDisplay === "shown" ||
								this.state.sortDisplay === "shown"
									? "shown"
									: "hidden"
							}`}
						>
							<hr></hr>
							{/* Form buttons */}
							<div className='Options__div button__container'>
								<button
									className='Options__button'
									type='reset'
									onClick={() => this.handleReset()}
								>
									Reset form
								</button>{" "}
								<button className='Options__button' type='submit'>
									Apply Options
								</button>
							</div>

							<Checkboxes
								display={this.state.filterDisplay}
								name='Category (Section)'
								sections={sections}
								handleChange={this.handleSortCheckboxes}
								filteredFolders={this.state.filteredFolders}
							/>

							<SortCategories
								display={this.state.sortDisplay}
								handleChange={this.handleInputChange}
							/>
						</div>
					</div>
				</form>
			);
		}
	};

	render() {
		const sections = this.context.sections;
		const searchIcon = <FontAwesomeIcon icon={faSearch} />;
		const { parent } = this.props;

		return (
			<form className={`Options__form mainContainer ${parent}`} onSubmit={e => this.handleSubmit(e)}>
				{(parent === "DemoNav") 
					? <SearchBar handleChange={this.handleInputChange} searchIcon={searchIcon} handleClick={this.handleToggleSearch} display={this.state.navSearchDisplay} />
					: <SearchBar handleChange={this.handleInputChange} searchIcon={searchIcon} />
				}

				{(parent === "DemoNav") //If the component is to be rendered in the nav bar
				? ( //Return the nav bar format
					<div className={`Options___div sortFilter ${this.state.navMoreDisplay}`}>
						<div className='Options__div h3Container'>
							<h3 className='Options__h3 h3___button psuedoButton' onClick={() => this.handleToggleMore("filter")}>Filter</h3>
							<h3 className='Options__h3 h3___button psuedoButton'onClick={() => this.handleToggleMore("sort")}>Sort</h3>
						</div>

						{(this.state.filterDisplay === "shown" ||	this.state.sortDisplay === "shown") //if the more components are to be showing
							? ( //return them
								<div className = "Options__div componentsContainer shown">
									<hr></hr>
									{/* Form buttons */}
									<div className='Options__div button__container'>
										<button className='Options__button' type='reset'onClick={() => this.handleReset()}>
											Reset form
										</button>{" "}

										<button className='Options__button' type='submit'>
											Apply Options
										</button>
									</div>

									<Checkboxes
										display={this.state.filterDisplay}
										name='Category (Section)'
										sections={sections}
										handleChange={this.handleSortCheckboxes}
										filteredFolders={this.state.filteredFolders}
									/>

									<SortCategories
										display={this.state.sortDisplay}
										handleChange={this.handleInputChange}
									/>
								</div>
							)
							: <div className = "Options__div componentsContainer hidden"></div> //else leave them hidden
						}
					</div>
				)
				: ( //else, it came from the main nav, so return that code 
					<div className='Options__div componentsContainer'>
						<div>
							<h3 className='Options__h3'>Filter</h3>
							<Checkboxes
								display={this.state.filterDisplay}
								name='Category (Section)'
								sections={sections}
								handleChange={this.handleSortCheckboxes}
								filteredFolders={this.state.filteredFolders}
							/>
						</div>

						<div>
							<h3 className='Options__h3'>Sort</h3>
							<SortCategories
								display={this.state.sortDisplay}
								handleChange={this.handleInputChange}
							/>
						</div>

						<div className='Options__div button__container'>
							<button className='Options__button' type='reset' onClick={() => this.handleReset()}>
								Reset form
							</button>{" "}
							
							<button className='Options__button' type='submit'>
								Apply Options
							</button>
						</div>
					</div>
				)
			}
			</form>
		);
	}
}
