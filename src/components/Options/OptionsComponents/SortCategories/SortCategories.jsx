import React from 'react';

const SortBy = (props) => {
  return (
    <select 
      className={`Option__select ${props.display}`} 
      name='sort'
      onChange={(e) => props.handleChange(e)}>

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
  )
}

export default SortBy;