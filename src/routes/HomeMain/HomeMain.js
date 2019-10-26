import React from 'react';

import './HomeMain.css';

export default function HomeMain () {
  return (
    <div className='HomeMain__div mainContainer'>
      <header className="HomeMain__header">
        <h1>Fridg·u·Dare</h1>
        <h2>Food for You, FUD for the Planet</h2>
      </header>

      <h3>There's a growing crisis... <span className='italic'>on the planet</span></h3>
      <p>America alone produces enough food waste to fill one football stadium <span>every. day.</span> </p>

      <h3>There's a growing crisis... <span className='italic'>in your fridge</span></h3>
      <p>Don't worry, we don't have to go into it. You're well familiar with how much good food ends up in your trash. <span className='italic'>Why should an abundance of food mean an abundance of waste?</span></p>

      <h3>Yes... there's now an app for that.</h3>
      <p><span className='italic'>Fridg·u·Dare</span> (or 'FUD' for short) challenges food waste by keeping a micro-inventory for your food. Keep track of what you have to help you decide what you need (and feel better about throwing less food away). A win for the planet and a win for your pocket!</p>

    </div>
  )
}