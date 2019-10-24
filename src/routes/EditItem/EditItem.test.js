import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditItem from './EditItem';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditItem />
    </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div);
})