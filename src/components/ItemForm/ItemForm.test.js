import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import ItemForm from './ItemForm';
import EditItem from '../../routes/EditItem/EditItem';
import AddItem from '../../routes/AddItem/AddItem';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ItemForm />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});