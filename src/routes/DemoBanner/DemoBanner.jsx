import React from 'react';
import { Link } from 'react-router-dom';

import './DemoBanner.css';

const DemoBanner = props => {
  return (
    <div className='DemoBanner__div mainContainer'>
      <p className='DemoBanner__p'>You're currently viewing the app demo. 
        <span className='notMobile'> Click <Link to='/' className='DemoBanner__link'>here</Link> to go home, or <span className='DemoBanner__div signup psuedoButton' onClick={() => props.toggleShow(true)}>here</span> to sign up.</span>
      </p> 
      <div className='mobile DemoBanner__div linkDiv'>
        <Link to='/'>Go home</Link>{' '}
        <div className='DemoBanner__div signup psuedoButton' onClick={() => props.toggleShow(true)}>Sign Up</div>
      </div>
    </div>
  )
}

export default DemoBanner;