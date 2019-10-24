import React from 'react';
import ReactDOM from 'react-dom';
import DemoNav from './DemoNav';
import { BrowserRouter } from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <DemoNav />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
})