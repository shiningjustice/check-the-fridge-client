import React from "react";

const SearchBar = props => {
	return (
		<div className='Search__div mainContainer'>
			<label htmlFor='search' className='Search__label nav' onClick={() => props.handleClick('nav', 'search')}>
				{props.searchIcon}
			</label>{" "}
			<label htmlFor='search' className='Search__label demoMain'>
				Search
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
