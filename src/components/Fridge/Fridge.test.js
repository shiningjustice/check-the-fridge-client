import React from 'react';
import ReactDOM from 'react-dom';
import Fridge from './Fridge';
import { BrowserRouter } from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Fridge />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
})