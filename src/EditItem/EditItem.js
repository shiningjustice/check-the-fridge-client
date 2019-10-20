import React, { Component } from 'react';

import ItemForm from '../ItemForm/ItemForm'
import ApiContext from '../ApiContext';

export default class EditItem extends Component {
  static contextType = ApiContext;

  render () {
    const { items } = this.context;
    console.log(items);

    //i need to get the item from the array. i can't index it because if it sorts differently like with a sort it wont' work. i need to get it by the id

    const itemId = this.props.match.params.id;
    // let item = items.filter(item => item.id !== 2);
    let item = items[0];

    // console.log(item.id)
    return (
      <ItemForm
        formName='EditItem'
        formVerb='Edit'
        history={this.props.history}
        item={item}
      />
    )
  }
}