import React from 'react';
import ReactDOM from 'react-dom';
import DemoMain from './DemoMain';
import { BrowserRouter } from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <DemoMain />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
})