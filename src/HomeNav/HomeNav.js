import React from 'react';
import { Link } from 'react-router-dom';

const HomeNav = (props) => {
  return (
    // <Link to='/sign-up' className='ListViewNav__Link'>Sign Up</Link>
    <Link to='/demo' className='ListViewNav__Link'>Demo</Link>
    // <Link to='/faq' className='ListViewNav__Link'>FAQ</Link>
  )
}

export default HomeNav;