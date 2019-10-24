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

it('renders the UI as expected for Add Form', () => {
  const tree = renderer
    .create(<ItemForm parent={AddItem} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})
it('renders the UI as expected for Edit Form', () => {
  const tree = renderer 
    .create(<ItemForm parent={EditItem} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})