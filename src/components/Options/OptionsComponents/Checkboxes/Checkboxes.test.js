import React from 'react';
import ReactDOM from 'react-dom';
import Checkboxes from './Checkboxes';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const sections = [
    {
      id: 1, 
      name: 'test1'
    },
    {
      id: 2, 
      name: 'test2'
    },
    {
      id: 3, 
      name: 'test3'
    },
  ];

  ReactDOM.render(
    <BrowserRouter>
      <Checkboxes sections={sections} />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
