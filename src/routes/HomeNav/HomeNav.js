import React from 'react';
import { Link } from 'react-router-dom';

import './HomeNav.css'

const HomeNav = (props) => {
  return (
    <div className='HomeNav__div mainContainer'>
      <Link to='#' ><span className='HomeNav__div signup psuedoButton' onClick={() => props.toggleShow(true)}>Sign Up</span></Link>
      <Link to='/demo' className='HomeNav__Link'>App Demo</Link>
    </div>
  )
}

export default HomeNav;