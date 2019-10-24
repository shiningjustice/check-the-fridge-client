import React from "react";

const SearchBar = props => {
	return (
		<div className='SearchBar__div mainContainer'>
			<label htmlFor='search' className='Search__label DemoNav psuedoButton' onClick={() => props.handleClick('search')}>
				{props.searchIcon}
			</label>{" "}
			<label htmlFor='search' className='Search__label DemoMain'>
				<h3 className='SearchBar__h3'>Search</h3>
			</label>{" "}
			<input
        className={`SearchBar__input ${props.display}`}
				name='search'
				type='text'
				onChange={e => props.handleChange(e)}
			></input>
		</div>
	);
};

export default SearchBar;
