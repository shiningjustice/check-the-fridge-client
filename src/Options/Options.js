import React from 'react';
import { Link } from 'react-router-dom';

export default function Options () {
  return (
    <div className="Options__div">
      <Link to='/add-item'>
        <button className='Options__button'>Add Item</button>
      </Link>

      
    </div>
  )
}