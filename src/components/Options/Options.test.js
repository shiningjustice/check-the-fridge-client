import React from 'react';
import ReactDOM from 'react-dom';
import Options from './Options';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Options />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
