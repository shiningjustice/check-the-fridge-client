import React from 'react';
import { Link } from 'react-router-dom';

const ListViewNav = (props) => {
  return(
    <>
      <Link to='/' className='ListViewNav__Link'>x</Link>{' '}
      {/* <Link to='/add-item' className='ListViewNav__Link'>Add New Item</Link> */}
    </>
  )
}

export default ListViewNav;