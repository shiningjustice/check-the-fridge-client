import React from 'react';
import { Link } from 'react-router-dom';

import Options from '../../components/Options/Options'

const DemoSubNav = (props) => {
  return(
    <>
      <Options parent='nav'/>
      <Link to='/demo/add-item' className='DemoSubNav__Link'>Add Item</Link>
    </>
  )
}

export default DemoSubNav;