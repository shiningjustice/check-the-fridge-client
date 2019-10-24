import React from 'react';
import ReactDOM from 'react-dom';
import FridgeItem from './FridgeItem';
import { BrowserRouter } from 'react-router-dom';

const item = {
  currQuantity: 1,
  dateAdded: "2019-10-21T07:00:00.000Z",
  id: 16,
  initQuantity: 1,
  name: "Mejool Dates",
  note: "",
  sectionId: 1,
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <FridgeItem item={item} />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
