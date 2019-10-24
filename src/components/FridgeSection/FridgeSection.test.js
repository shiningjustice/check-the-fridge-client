import React from 'react';
import ReactDOM from 'react-dom';
import FridgeSection from './FridgeSection';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <FridgeSection />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
