import React from 'react';
import ReactDOM from 'react-dom';
import DemoBanner from './DemoBanner';
import { BrowserRouter } from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <DemoBanner />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
})