import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import { BrowserRouter } from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
})