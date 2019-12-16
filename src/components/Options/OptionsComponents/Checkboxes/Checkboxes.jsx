import React from 'react';

import './Checkboxes.css';

const Checkboxes = props => {

	return (
		<div className={`Checkboxes__div mainContainer ${props.display}`}>
			<h4 htmlFor={props.name} className={`Options__h4 ${props.parent}`}>{props.name}</h4>
			<div className='Checkboxes__div checkboxContainer'>
				{/* If a search/sort/filter is applied, display checkbox only if section 
				is still displayed (if it contains items returned from the query) */
				props.sections.map(section => section.display && (
					<label className={`Checkboxes__label ${props.parent}`} key={section.id}>
						<input
							className={`Checkboxes__input ${props.parent}`}
							id={section.id}
							name={section.name}
							onChange={props.handleChange}
							value={section.id}
							// checked={props.filteredFolders.indexOf(section) > -1}
							type='checkbox'
						/>
					{section.name}</label>
				))}
			</div>
		</div>
	)
}
export default Checkboxes;