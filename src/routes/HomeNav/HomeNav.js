import React from 'react';
import { Link } from 'react-router-dom';

import './HomeNav.css'

const HomeNav = (props) => {
  return (
    <div className='HomeNav__div mainContainer'>
      <div className='HomeNav__div signup psuedoButton' onClick={() => props.toggleShow(true)}>Sign Up</div>
      <Link to='/demo' className='HomeNav__Link'>App Demo</Link>
      {/* <Link to='/faq' className='HomeNav__Link'>FAQ</Link> */}
    </div>
  )
}

export default HomeNav;