import React from 'react';
import { Link } from 'react-router-dom';

const DemoSubNav = (props) => {
  return(
    <>
      <Link to='/demo/add-item' className='DemoSubNav__Link'>Add Item</Link>
    </>
  )
}

export default DemoSubNav;