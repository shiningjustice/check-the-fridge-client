import React from 'react';
import ReactDOM from 'react-dom';
import HomeMain from './HomeMain';
import { BrowserRouter } from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <HomeMain />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
})